export type PieceType = 'center' | 'edge' | 'corner'

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