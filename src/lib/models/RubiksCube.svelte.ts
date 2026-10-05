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
    values = $state<(0 | 1)[]>([]);

    constructor(initialValues: (0 | 1)[]) {
        this.values = initialValues;
    }

    public toggleValue(index: number): void {
        if (index < 0 || index >= this.values.length) return;
        this.values[index] = this.values[index] === 1 ? 0 : 1;
    }

    public getValue(index: number): number {
        return this.values[index] ?? 0;
    }
}

export class AdjacentFacets {
    values = $state<(0 | 1)[]>([]);
    public readonly side: SideLocation;

    constructor(side: SideLocation, initialValues: (0 | 1)[]) {
        this.values = initialValues;
        this.side = side;
    }

    public toggleValue(index: number): void {
        if (index < 0 || index >= this.values.length) return;
        this.values[index] = this.values[index] === 1 ? 0 : 1;
    }

    public getValue(index: number): number {
        return this.values[index] ?? 0;
    }
}