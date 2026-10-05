<script lang="ts">
    const FaceSize = 100;
    const TabDepth = 32;
    const Inset = FaceSize * 0.1;
    const FaceStrokeColor = "#000";
    const FaceStrokeWidth = 4;

    const StrokeOffset = FaceStrokeWidth / 2;
    const GridOffset = StrokeOffset + TabDepth;
    const ViewportSize = FaceSize * 3 + TabDepth * 2 + FaceStrokeWidth;

    let gridState: Array<0 | 1> = [0, 0, 0, 0, 1, 0, 0, 0, 0];
    let topSide: Array<0 | 1> = [0, 0, 0];
    let rightSide: Array<0 | 1> = [0, 0, 0];
    let bottomSide: Array<0 | 1> = [0, 0, 0];
    let leftSide: Array<0 | 1> = [0, 0, 0];

    function toggleGrid(i: number): void {
        gridState[i] = gridState[i] === 1 ? 0 : 1;
    }

    function toggleSide(side: 'top' | 'right' | 'bottom' | 'left', i: number): void {
        if (side === 'top') topSide[i] = topSide[i] === 1 ? 0 : 1;
        if (side === 'right') rightSide[i] = rightSide[i] === 1 ? 0 : 1;
        if (side === 'bottom') bottomSide[i] = bottomSide[i] === 1 ? 0 : 1;
        if (side === 'left') leftSide[i] = leftSide[i] === 1 ? 0 : 1;
    }

    function getColor(val: 0 | 1): string {
        return val === 1 ? "#FFE600" : "#4A4A4A";
    }

    function getTabPoints(side: 'top' | 'right' | 'bottom' | 'left', i: number): string {
        if (side === 'top') {
            const x0 = GridOffset + i * FaceSize;
            const x1 = x0 + FaceSize;
            const y0 = GridOffset;
            const yTop = y0 - TabDepth;
            return `${x0},${y0} ${x1},${y0} ${x1 - Inset},${yTop} ${x0 + Inset},${yTop}`;
        }
        if (side === 'bottom') {
            const x0 = GridOffset + i * FaceSize;
            const x1 = x0 + FaceSize;
            const y1 = GridOffset + FaceSize * 3;
            const yBot = y1 + TabDepth;
            return `${x0},${y1} ${x1},${y1} ${x1 - Inset},${yBot} ${x0 + Inset},${yBot}`;
        }
        if (side === 'left') {
            const y0 = GridOffset + i * FaceSize;
            const y1 = y0 + FaceSize;
            const x0 = GridOffset;
            const xLeft = x0 - TabDepth;
            return `${x0},${y0} ${x0},${y1} ${xLeft},${y1 - Inset} ${xLeft},${y0 + Inset}`;
        }
        if (side === 'right') {
            const y0 = GridOffset + i * FaceSize;
            const y1 = y0 + FaceSize;
            const x1 = GridOffset + FaceSize * 3;
            const xRight = x1 + TabDepth;
            return `${x1},${y0} ${x1},${y1} ${xRight},${y1 - Inset} ${xRight},${y0 + Inset}`;
        }
        return '';
    }
</script>

<div class="p-8">
    <svg height={ViewportSize} viewBox="0 0 {ViewportSize} {ViewportSize}" width={ViewportSize}>
        {#each gridState as val, i}
            <g
                    role="button"
                    tabindex="0"
                    class="cursor-pointer focus:outline-none"
                    aria-label="grid-{i}"
                    on:click={() => toggleGrid(i)}
                    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleGrid(i)}
            >
                <rect
                        x={GridOffset + (i % 3) * FaceSize}
                        y={GridOffset + Math.floor(i / 3) * FaceSize}
                        width={FaceSize}
                        height={FaceSize}
                        fill={getColor(val)}
                        stroke={FaceStrokeColor}
                        stroke-width={FaceStrokeWidth}
                />
            </g>
        {/each}

        {#each topSide as val, i}
            <g
                    role="button"
                    tabindex="0"
                    class="cursor-pointer focus:outline-none"
                    aria-label="top-side-{i}"
                    on:click={() => toggleSide('top', i)}
                    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSide('top', i)}
            >
                <polygon
                        points={getTabPoints('top', i)}
                        fill={getColor(val)}
                        stroke={FaceStrokeColor}
                        stroke-width={FaceStrokeWidth}
                />
            </g>
        {/each}

        {#each rightSide as val, i}
            <g
                    role="button"
                    tabindex="0"
                    class="cursor-pointer focus:outline-none"
                    aria-label="right-side-{i}"
                    on:click={() => toggleSide('right', i)}
                    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSide('right', i)}
            >
                <polygon
                        points={getTabPoints('right', i)}
                        fill={getColor(val)}
                        stroke={FaceStrokeColor}
                        stroke-width={FaceStrokeWidth}
                />
            </g>
        {/each}

        {#each bottomSide as val, i}
            <g
                    role="button"
                    tabindex="0"
                    class="cursor-pointer focus:outline-none"
                    aria-label="bottom-side-{i}"
                    on:click={() => toggleSide('bottom', i)}
                    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSide('bottom', i)}
            >
                <polygon
                        points={getTabPoints('bottom', i)}
                        fill={getColor(val)}
                        stroke={FaceStrokeColor}
                        stroke-width={FaceStrokeWidth}
                />
            </g>
        {/each}

        {#each leftSide as val, i}
            <g
                    role="button"
                    tabindex="0"
                    class="cursor-pointer focus:outline-none"
                    aria-label="left-side-{i}"
                    on:click={() => toggleSide('left', i)}
                    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSide('left', i)}
            >
                <polygon
                        points={getTabPoints('left', i)}
                        fill={getColor(val)}
                        stroke={FaceStrokeColor}
                        stroke-width={FaceStrokeWidth}
                />
            </g>
        {/each}
    </svg>
</div>