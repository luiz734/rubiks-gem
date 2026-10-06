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

type Face = 'front' | SideLocation;

// MARKER_FACES[pieceIndex][flipIndex] = face marker is
const MARKER_FACES: Face[][] = [
    ['front', 'left',  'top'],     // 0 corner
    ['front', 'top'],              // 1 edge
    ['front', 'top',   'right'],   // 2 corner
    ['front', 'left'],             // 3 edge
    ['front'],                     // 4 center
    ['front', 'right'],            // 5 edge
    ['front', 'bottom', 'left'],   // 6 corner
    ['front', 'bottom'],           // 7 edge
    ['front', 'right', 'bottom'],  // 8 corner
];

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

    private markerFace(i: number): Face {
        return MARKER_FACES[i][this.state[i].flipIndex];
    }

    getFrontState(): FacetValue[] {
        return this.state.map((_, i) => (this.markerFace(i) === 'front' ? 1 : 0));
    }

    getSideState(which: SideLocation): FacetValue[] {
        return SIDE_INDICES[which].map((i) => (this.markerFace(i) === which ? 1 : 0));
    }

  private pointPiece(i: number, face: Face) {
        const idx = MARKER_FACES[i].indexOf(face);
        if (idx !== -1) this.state[i].flipIndex = idx;
    }

  clickSide(side: SideLocation, pos: number) {
        const i = SIDE_INDICES[side][pos];
        this.pointPiece(i, side);
    }

    public toggleFace(faceIndex: number): void {
        this.pointPiece(faceIndex, 'front');
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