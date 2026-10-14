import { ColorUtils } from './colors'
import { Piece } from './piece.svelte'
import { isHexColor } from './exportSettings.svelte'

export const ACTIVE_MODES = ['oll', 'pll'] as const
export const DEFAULT_COLORS = {
    sticker: '#FFE600',
    empty: '#4A4A4A',
    arrow: '#0020FF',
} as const
export const DEFAULT_STROKES = { outer: 4, inner: 4, adjacent: 4 } as const
export type SideLocation = 'top' | 'right' | 'bottom' | 'left'
export type FacetValue = 0 | 1

const ROTATION_ANGLES = [0, 90, 180, 270] as const
export type RotationAngle = (typeof ROTATION_ANGLES)[number]

export type ActiveMode = (typeof ACTIVE_MODES)[number]
export type Arrow = { from: number; to: number }
export type ArrowStyle = {
    color: string
    width: number
    offset: number // px trimmed from each end, measured from the piece centers
}
export type ArrowGroup = {
    kind: 'single' | 'double'
    from: number
    to: number
    srcFrom: number
    srcTo: number
}

type Face = 'front' | SideLocation

const SIDES: SideLocation[] = ['top', 'right', 'bottom', 'left']
// MARKER_FACES[pieceIndex][flipIndex] = face marker is
const MARKER_FACES: Face[][] = [
    ['front', 'left', 'top'], // 0 corner
    ['front', 'top'], // 1 edge
    ['front', 'top', 'right'], // 2 corner
    ['front', 'left'], // 3 edge
    ['front'], // 4 center
    ['front', 'right'], // 5 edge
    ['front', 'bottom', 'left'], // 6 corner
    ['front', 'bottom'], // 7 edge
    ['front', 'right', 'bottom'], // 8 corner
]
const SIDE_INDICES: Record<SideLocation, [number, number, number]> = {
    top: [0, 1, 2],
    right: [2, 5, 8],
    bottom: [6, 7, 8],
    left: [0, 3, 6],
}
const DEFAULT_ARROW_WIDTH = 12
const DEFAULT_ARROW_OFFSET = 10

export function isActiveMode(value: unknown): value is ActiveMode {
    return ACTIVE_MODES.includes(value as ActiveMode)
}

function isRotationAngle(value: unknown): value is RotationAngle {
    return ROTATION_ANGLES.includes(value as RotationAngle)
}

export class RubiksCube {
    private static readonly EDGES = [1, 3, 5, 7]
    private static readonly CORNERS = [0, 2, 6, 8]

    state = $state<Piece[]>([])
    rotation: RotationAngle = $state<RotationAngle>(0)

    #mode: ActiveMode = $state<ActiveMode>('oll')
    get mode() {
        return this.#mode
    }
    set mode(value: ActiveMode) {
        if (value === 'pll' && this.mode !== 'pll') {
            this.#savedFlips = this.state.map((p) => p.flipIndex)
            this.setAllPieces(1)
        } else if (value === 'oll' && this.#savedFlips) {
            this.state.forEach((p, i) => (p.flipIndex = this.#savedFlips![i]))
            this.#savedFlips = null
        }
        this.#mode = value
        // reset pending arrows
        this.pendingFrom = null
    }
    #savedFlips: number[] | null = null

    arrows = $state<Arrow[]>([])
    pendingFrom = $state<number | null>(null)
    arrowStyle = $state<ArrowStyle>({
        color: DEFAULT_COLORS.arrow,
        width: DEFAULT_ARROW_WIDTH,
        offset: DEFAULT_ARROW_OFFSET,
    })

    colors = $state({
        sticker: DEFAULT_COLORS.sticker as string,
        empty: DEFAULT_COLORS.empty as string,
    })

    strokes = $state({
        outer: DEFAULT_STROKES.outer as number,
        inner: DEFAULT_STROKES.inner as number,
        adjacent: DEFAULT_STROKES.adjacent as number,
    })

    constructor() {
        this.state = [
            new Piece('corner'),
            new Piece('edge'),
            new Piece('corner'),

            new Piece('edge'),
            new Piece('center'),
            new Piece('edge'),

            new Piece('corner'),
            new Piece('edge'),
            new Piece('corner'),
        ]

        this.mode = 'oll'
    }

    // ******************************************* Persist Interface
    serialize() {
        return {
            activeMode: this.mode,
            pieces: this.state.map((p) => p.serialize()),
            savedFlips: this.#savedFlips,
            rotation: this.rotation,
            arrows: this.arrows,
            arrowStyle: this.arrowStyle,
            colors: this.colors,
            strokes: this.strokes,
        }
    }

    restore(data: any) {
        // ORDER MATTERS!
        // Be careful!!!

        if (isRotationAngle(data?.rotation)) this.rotation = data.rotation

        data?.pieces.forEach((x: any, index: number) => {
            this.state[index].restore(x)
        })

        // Pieces must come first
        // See the setter of this.mode
        if (isActiveMode(data?.activeMode)) this.mode = data.activeMode

        // The setter of 'mode' overwrites 'savedFlips'
        // This must come AFTER it
        this.#savedFlips = data?.savedFlips ?? []

        this.arrows = data?.arrows ?? []

        // We don't save pending state
        // This does nothing. It is Just to be explicit about it
        this.pendingFrom = null

        this.arrowStyle = {
            color: isHexColor(data?.arrowStyle?.color)
                ? data.arrowStyle.color
                : DEFAULT_COLORS.arrow,
            width: isFiniteNumber(data?.arrowStyle?.width)
                ? data.arrowStyle.width
                : DEFAULT_ARROW_WIDTH,
            offset: isFiniteNumber(data?.arrowStyle?.offset)
                ? data.arrowStyle.offset
                : DEFAULT_ARROW_OFFSET,
        }

        this.colors = {
            sticker: isHexColor(data?.colors?.sticker)
                ? data.colors.sticker
                : DEFAULT_COLORS.sticker,
            empty: isHexColor(data?.colors?.empty)
                ? data.colors.empty
                : DEFAULT_COLORS.empty,
        }

        this.strokes = {
            outer: isFiniteNumber(data?.strokes?.outer)
                ? data.strokes.outer
                : (DEFAULT_STROKES.outer as number),
            inner: isFiniteNumber(data?.strokes?.inner)
                ? data.strokes.inner
                : (DEFAULT_STROKES.inner as number),
            adjacent: isFiniteNumber(data?.strokes?.adjacent)
                ? data.strokes.adjacent
                : (DEFAULT_STROKES.adjacent as number),
        }
    }

    // ******************************************* Getters/Setters
    get displayArrows() {
        return this.arrows.map((a) => ({
            from: this.source2Display(a.from),
            to: this.source2Display(a.to),
        }))
    }

    // get ollMode() {
    //     return this.#mode === 'oll'
    // }

    get pllMode() {
        return this.#mode === 'pll'
    }

    // Group pairs of opposite arrows
    // E.g. 0->1 and 1->0
    get arrowGroups(): ArrowGroup[] {
        const groups: ArrowGroup[] = []
        const alreadyGrouped = new Set<number>()

        const isReverseOf = (a: Arrow, b: Arrow): boolean =>
            b.from === a.to && b.to === a.from

        this.arrows.forEach((arrow: Arrow, arrowIndex: number): void => {
            if (alreadyGrouped.has(arrowIndex)) return

            const reverseIndex = this.arrows.findIndex(
                (candidate, candidateIndex) =>
                    candidateIndex > arrowIndex &&
                    !alreadyGrouped.has(candidateIndex) &&
                    isReverseOf(arrow, candidate)
            )
            const hasReverse = reverseIndex >= 0

            if (hasReverse) alreadyGrouped.add(reverseIndex)

            groups.push({
                kind: hasReverse ? 'double' : 'single',
                from: this.source2Display(arrow.from),
                to: this.source2Display(arrow.to),
                srcFrom: arrow.from,
                srcTo: arrow.to,
            })
        })

        return groups
    }

    // ******************************************* Public
    getStickerColor(val: 0 | 1 | number): string {
        return val === 1 ? this.colors.sticker : this.colors.empty
    }

    getPendingColor(): string {
        return ColorUtils.shift(this.colors.sticker, 0.25)
    }

    isPending(displayIndex: number): boolean {
        return this.pendingFrom === this.display2Source(displayIndex)
    }

    getFrontState(): FacetValue[] {
        return this.state.map((_, d) =>
            this.getMarkerFace(this.display2Source(d)) === 'front' ? 1 : 0
        )
    }

    getSideState(which: SideLocation): FacetValue[] {
        // Side considering the rotation
        const src = this.sourceSide(which)
        return SIDE_INDICES[which].map((d) =>
            this.getMarkerFace(this.display2Source(d)) === src ? 1 : 0
        )
    }

    // Clicks only happen in pll mode
    // oll all pieces should always face top
    clickFront(displayIndex: number) {
        const i = this.display2Source(displayIndex)
        if (this.mode === 'oll') {
            this.setMarkerToFace(i, 'front')
        } else {
            this.clickPll(i)
        }
    }

    // Side is the same as "adjacent"
    clickSide(side: SideLocation, pos: number) {
        if (this.mode === 'pll') {
            return
        }
        const i = this.display2Source(SIDE_INDICES[side][pos])
        this.setMarkerToFace(i, this.sourceSide(side))
    }

    rotateBy(delta: 90 | -90) {
        this.rotation = ((this.rotation + delta + 360) % 360) as RotationAngle
    }

    setAllEdges(value: FacetValue) {
        this.setPiecesUpOrDown(RubiksCube.EDGES, value)
    }
    setAllCorners(value: FacetValue) {
        this.setPiecesUpOrDown(RubiksCube.CORNERS, value)
    }

    allEdgesFilled(): boolean {
        return RubiksCube.EDGES.every((i) => this.state[i].isFacingUp())
    }
    allCornersFilled(): boolean {
        return RubiksCube.CORNERS.every((i) => this.state[i].isFacingUp())
    }

    setAllPieces(value: 0 | 1) {
        this.setAllEdges(value)
        this.setAllCorners(value)
        // Centerpiece never changes
    }

    allPiecesFilled(): boolean {
        return this.allEdgesFilled() && this.allCornersFilled()
    }

    removeSingleArrow(srcFrom: number, srcTo: number) {
        this.arrows = this.arrows.filter(
            (a) =>
                !(
                    (a.from === srcFrom && a.to === srcTo) ||
                    (a.from === srcTo && a.to === srcFrom)
                )
        )
    }

    removeAllArrows() {
        this.arrows = []
        this.pendingFrom = null
    }

    // ******************************************* Private
    private get rotationSteps() {
        return this.rotation / 90
    }

    // Given a display index, returns the same index without rotation
    private display2Source(display: number): number {
        let r = Math.floor(display / 3),
            c = display % 3

        // Undo rotationSteps CW turns
        for (let s = 0; s < this.rotationSteps; s++) {
            ;[r, c] = [2 - c, r]
        }
        return r * 3 + c
    }
    // Inverse of display2Source
    private source2Display(source: number): number {
        let r = Math.floor(source / 3),
            c = source % 3

        for (let s = 0; s < this.rotationSteps; s++) {
            ;[r, c] = [c, 2 - r]
        }
        return r * 3 + c
    }

    // A side considering rotation
    // E.g.:
    //          ['top', 'right', 'bottom', 'left']
    // turns into
    //          [ 'bottom', 'left', 'top', 'right']
    // with 2 rotations.
    private sourceSide(side: SideLocation): SideLocation {
        return SIDES[(SIDES.indexOf(side) - this.rotationSteps + 4) % 4]
    }

    // Returns the face which "marker" (yellow face) currently is
    private getMarkerFace(i: number): Face {
        return MARKER_FACES[i][this.state[i].flipIndex]
    }

    private setMarkerToFace(i: number, face: Face) {
        const idx = MARKER_FACES[i].indexOf(face)
        if (idx !== -1) {
            this.state[i].flipIndex = idx
        }
    }

    private clickPll(i: number) {
        if (this.pendingFrom === null) {
            this.pendingFrom = i
            return
        }

        const from = this.pendingFrom
        this.pendingFrom = null
        // same piece -> cancel
        if (from === i) return

        const existing = this.arrows.findIndex(
            (a) => a.from === from && a.to === i
        )
        // same arrow again: remove it
        if (existing >= 0) {
            this.arrows.splice(existing, 1)
            // Removes a -> b
            // Also removes b -> a
            const otherWay = this.arrows.findIndex(
                (a) => a.from === i && a.to === from
            )
            if (otherWay !== -1) {
                this.arrows.splice(otherWay, 1)
            }
        } else {
            this.arrows.push({ from, to: i })
        }
    }

    // Down means not facing up in this context
    // We just care about it not facing up
    private setPiecesUpOrDown(indices: number[], value: FacetValue) {
        for (const i of indices) {
            const p = this.state[i]
            if (value === 1) {
                p.firstRotationState()
            } else {
                p.lastRotationState()
            }
        }
    }
}

function isFiniteNumber(value: any): boolean {
    return typeof value === 'number' && Number.isFinite(value)
}
