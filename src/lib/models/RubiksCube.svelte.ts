export type SideLocation = 'top' | 'right' | 'bottom' | 'left';

export type PieceIndex = 0|1|2|3|4|5|6|7|8;
export type PieceType = 'center' | 'edge' | 'corner';
export type FacetValue = 0|1;

export class Piece {
    flipIndex = $state<number>(0);
    readonly flipCycle : 1|2|3;
    type: PieceType;

    constructor(type: PieceType) {
        this.type = type;

        switch (type) {
            case 'center': this.flipCycle = 1; break;
            case 'edge': this.flipCycle = 2; break;
            case 'corner': this.flipCycle = 3; break;
        }
    }

    rotateCW() {
        this.flipIndex = (this.flipIndex + 1) % this.flipCycle;
    }
    rotateCCW() {
        this.flipIndex = (this.flipIndex - 1 + this.flipCycle) % this.flipCycle;
    }

    firstRotationState() {
        this.flipIndex = 0;
    }
    lastRotationState() {
        if (this.flipCycle === 1) return;
        this.firstRotationState()
        this.rotateCW();
    }


    isFacingUp(): boolean {
        return this.flipIndex === 0;
    }
}

const CORNER_SIDES: Partial<Record<number, [SideLocation, SideLocation]>> = {
    // [side at flipIndex 1, side at flipIndex 2]
    0: ['left', 'top'],
    2: ['top', 'right'],
    6: ['bottom', 'left'],
    8: ['right', 'bottom'],
};

const EDGE_SIDE: Partial<Record<number, SideLocation>> = {
    1: 'top', 3: 'left', 5: 'right', 7: 'bottom',
};

// piece indices touching each side, in reading order
// (top/bottom: left→right, left/right: top→bottom)
const SIDE_INDICES: Record<SideLocation, [number, number, number]> = {
    top:    [0, 1, 2],
    right:  [2, 5, 8],
    bottom: [6, 7, 8],
    left:   [0, 3, 6],
};


export class RubiksCube {
    state = $state<Piece[]>([]);

    constructor(
    ) {
        this.state = [
            new Piece("corner"), new Piece("edge"), new Piece("corner"),
            new Piece("edge"), new Piece("center"), new Piece("edge"),
            new Piece("corner"), new Piece("edge"), new Piece("corner"),
        ]
    }

    /** Where the marked sticker of piece `i` currently is. */
    private markerSide(i: number): 'front' | SideLocation | null {
        const p = this.state[i];
        if (p.flipIndex === 0) return 'front';

        if (p.type === 'edge') return EDGE_SIDE[i] ?? null;
        if (p.type === 'corner') return CORNER_SIDES[i]?.[p.flipIndex - 1] ?? null;
        return null; // center
    }

    getFrontState(): FacetValue[] {
        return this.state.map((p) => (p.isFacingUp() ? 1 : 0));
    }

    getSideState(which: SideLocation): FacetValue[] {
        return SIDE_INDICES[which].map((i) => (this.markerSide(i) === which ? 1 : 0));
    }

    public toggleFace(faceIndex: number): void {
        this.state[faceIndex].rotateCW();
        console.log($state.snapshot(this.state));
    }

    setAllEdges(value: (0|1)) {
        [1, 3, 5, 7].map((i) => {
            if (value === 1) {
                this.state[i].firstRotationState();
            } else {
                this.state[i].lastRotationState();
            }
        })
    }

    allEdgesFilled(): boolean {
        return [1, 3, 5, 7].every((i) => this.state[i].isFacingUp());
    }

    setAllCorners(value: (0|1)) {
        [0, 2, 6, 8].map((i) => {
            if (value === 1) {
                this.state[i].firstRotationState();
            } else {
                this.state[i].lastRotationState();
            }
        })
    }

    allCornersFilled(): boolean {
        return [0, 2, 6, 8].every((i) => this.state[i].isFacingUp());
    }

    setAllPieces(value: (0|1)) {
        this.setAllEdges(value);
        this.setAllCorners(value);
        // center piece
        // this.state.values[4] = value;
    }

    allPiecesFilled(): boolean {
        return this.allEdgesFilled() && this.allCornersFilled();
    }
}