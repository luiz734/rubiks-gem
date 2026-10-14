import type { Persistable } from './persist.svelte'

const PIECE_TYPES = ['center', 'edge', 'corner'] as const
export type PieceType = (typeof PIECE_TYPES)[number]
export function isPieceType(value: unknown): value is PieceType {
    return PIECE_TYPES.includes(value as PieceType)
}

const FLIP_CYCLES: Record<PieceType, 1 | 2 | 3> = {
    center: 1,
    edge: 2,
    corner: 3,
}

export class Piece implements Persistable {
    flipIndex = $state<number>(0)
    type = $state<PieceType>('center')
    flipCycle = $derived(FLIP_CYCLES[this.type])

    constructor(type: PieceType) {
        this.type = type
    }

    serialize(): unknown {
        return {
            flipIndex: this.flipIndex,
            type: this.type,
        }
    }
    restore(data: any) {
        if (typeof data?.flipIndex === 'number' && Number.isFinite(data.flipIndex)) {
            this.flipIndex = data.flipIndex
        }

        if (isPieceType(data?.type)) {
            this.type = data?.type
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
