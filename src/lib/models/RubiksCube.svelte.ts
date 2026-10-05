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

    setAllEdges(value: (0|1)) {
        let newState = this.frontFace.values;
        newState[1] = value;
        newState[3] = value;
        newState[5] = value;
        newState[7] = value;

        this.frontFace.values = newState;
    }
    allEdgesFilled(): boolean {
        return this.frontFace.values[1] == 1
            && this.frontFace.values[3] == 1
            && this.frontFace.values[5] == 1
            && this.frontFace.values[7] == 1;
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