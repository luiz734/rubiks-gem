export type SideLocation = 'top' | 'right' | 'bottom' | 'left'

export type PieceIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type PieceType = 'center' | 'edge' | 'corner'
export type FacetValue = 0 | 1

export class Piece {
    flipIndex = $state<number>(0)
    readonly flipCycle: 1 | 2 | 3
    type: PieceType

    constructor(type: PieceType) {
        this.type = type

        switch (type) {
            case 'center':
                this.flipCycle = 1
                break
            case 'edge':
                this.flipCycle = 2
                break
            case 'corner':
                this.flipCycle = 3
                break
        }
    }

    rotateCW() {
        this.flipIndex = (this.flipIndex + 1) % this.flipCycle
    }
    rotateCCW() {
        this.flipIndex = (this.flipIndex - 1 + this.flipCycle) % this.flipCycle
    }

    firstRotationState() {
        this.flipIndex = 0
    }
    lastRotationState() {
        this.flipIndex = this.flipCycle - 1
    }

    isFacingUp(): boolean {
        return this.flipIndex === 0
    }
}

type Face = 'front' | SideLocation

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

const SIDES: SideLocation[] = ['top', 'right', 'bottom', 'left']
export type RotationAngle = 0 | 90 | 180 | 270
export type ActiveMode = 'oll' | 'pll'

export type Arrow = { from: number; to: number }
export type ArrowStyle = {
    color: string
    headColor: string
    width: number
    offset: number // px trimmed from each end, measured from the piece centers
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
        color: '#001AFF',
        headColor: '#001AFF',
        width: 12,
        offset: 10,
    })

    constructor(mode: ActiveMode) {
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

        this.mode = mode
        $inspect(this.arrows)
        // $inspect(this.rotation);
    }

    private get steps() {
        return this.rotation / 90
    }
    private sourceIndex(display: number): number {
        let r = Math.floor(display / 3),
            c = display % 3
        for (let s = 0; s < this.steps; s++) [r, c] = [2 - c, r] // undo one CW turn
        return r * 3 + c
    }
    /** inverse of sourceIndex: where does source piece i appear on screen? */
    private displayIndex(source: number): number {
        let r = Math.floor(source / 3),
            c = source % 3
        for (let s = 0; s < this.steps; s++) [r, c] = [c, 2 - r] // one CW turn
        return r * 3 + c
    }
    get displayArrows() {
        return this.arrows.map((a) => ({
            from: this.displayIndex(a.from),
            to: this.displayIndex(a.to),
        }))
    }
    isPending(displayIndex: number): boolean {
        return this.pendingFrom === this.sourceIndex(displayIndex)
    }

    private sourceSide(side: SideLocation): SideLocation {
        return SIDES[(SIDES.indexOf(side) - this.steps + 4) % 4]
    }

    private markerFace(i: number): Face {
        return MARKER_FACES[i][this.state[i].flipIndex]
    }

    private pointPiece(i: number, face: Face) {
        const idx = MARKER_FACES[i].indexOf(face)
        if (idx !== -1) this.state[i].flipIndex = idx
    }

    getFrontState(): FacetValue[] {
        return this.state.map((_, d) =>
            this.markerFace(this.sourceIndex(d)) === 'front' ? 1 : 0
        )
    }

    getSideState(which: SideLocation): FacetValue[] {
        const src = this.sourceSide(which)
        return SIDE_INDICES[which].map((d) =>
            this.markerFace(this.sourceIndex(d)) === src ? 1 : 0
        )
    }

    // Clicks only happen in pll mode
    // oll all pieces should always face top
    clickFront(displayIndex: number) {
        const i = this.sourceIndex(displayIndex)
        if (this.mode === 'oll') {
            this.pointPiece(i, 'front')
        } else {
            this.clickPll(i)
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

    clearArrows() {
        this.arrows = []
        this.pendingFrom = null
    }

    clickSide(side: SideLocation, pos: number) {
        if (this.mode === 'pll') {
            return
        }
        const i = this.sourceIndex(SIDE_INDICES[side][pos])
        this.pointPiece(i, this.sourceSide(side))
    }

    rotateBy(delta: 90 | -90) {
        this.rotation = ((this.rotation + delta + 360) % 360) as RotationAngle
    }

    private setPieces(indices: number[], value: FacetValue) {
        for (const i of indices) {
            const p = this.state[i]
            if (value === 1) p.firstRotationState()
            else p.lastRotationState()
        }
    }

    setAllEdges(value: FacetValue) {
        this.setPieces(RubiksCube.EDGES, value)
    }
    setAllCorners(value: FacetValue) {
        this.setPieces(RubiksCube.CORNERS, value)
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
        // center piece
        // this.state.values[4] = value;
    }

    allPiecesFilled(): boolean {
        return this.allEdgesFilled() && this.allCornersFilled()
    }
}
