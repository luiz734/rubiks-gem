export type SideLocation = 'top' | 'right' | 'bottom' | 'left';

export class RubiksCube {
    constructor(
        public frontFace: FrontFace,

        public adjacentTop: AdjacentFacets,
        public adjacentRight: AdjacentFacets,
        public adjacentBottom: AdjacentFacets,
        public adjacentLeft: AdjacentFacets,
    ) {
    }

    public toggleSide(side: SideLocation, i: number): void {
        if (side === 'top') this.adjacentTop.toggleValue(i);
        if (side === 'right') this.adjacentRight.toggleValue(i);
        if (side === 'bottom') this.adjacentBottom.toggleValue(i);
        if (side === 'left') this.adjacentLeft.toggleValue(i);
    }

    public toggleFace(faceIndex: number): void {
        this.frontFace.toggleValue(faceIndex);
    }
}

export class FrontFace {
    constructor(
        public readonly values: (0|1)[]
    ) {}

    public toggleValue(index: number): FrontFace {
        if (index < 0 || index >= this.values.length) return this;

        const newValues = [...this.values];
        newValues[index] = newValues[index] === 1 ? 0 : 1;

        return new FrontFace(newValues);
    }

    public getValue(index: number): number {
        return this.values[index] ?? 0;
    }
}

export class AdjacentFacets {
    constructor(
        public readonly side: SideLocation,
        public readonly values: (0|1)[]
    ) {}

    public toggleValue(index: number): AdjacentFacets {
        if (index < 0 || index >= this.values.length) return this;

        const newValues = [...this.values];
        newValues[index] = newValues[index] === 1 ? 0 : 1;

        return new AdjacentFacets(this.side, newValues);
    }

    public getValue(index: number): number {
        return this.values[index] ?? 0;
    }
}