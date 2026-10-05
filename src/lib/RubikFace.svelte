<script lang="ts">
    type ColorKey = 'yellow' | 'gray';

    const COLOR_MAP: Record<ColorKey, string> = {
        yellow: '#FFE600',
        gray: '#4A4A4A'
    };

    // 1 = yellow, 0 = gray
    let gridState: Array<0 | 1> = [0, 0, 0, 0, 1, 0, 0, 0, 0];

    // let topSide: Array<0 | 1> = [0, 0, 0];

    function toggleGrid(i: number): void {
        gridState[i] = gridState[i] === 1 ? 0 : 1;
    }

    // function toggleTop(i: number): void {
    //     topSide[i] = topSide[i] === 1 ? 0 : 1;
    // }

    function getColor(val: 0 | 1): string {
        return val === 1 ? COLOR_MAP.yellow : COLOR_MAP.gray;
    }

    const FaceSize = 100;
    const FaceStrokeColor = "#000";
    const FaceStrokeWidth = 4;
    const Offset = FaceStrokeWidth / 2;
    const ViewportSize = FaceSize * 3 + FaceStrokeWidth;

</script>

<div class="p-8">
    <svg height={ViewportSize} viewBox="0 0 {ViewportSize} {ViewportSize}" width={ViewportSize}>

        {#each gridState as val, i}
            <g
                    role="button"
                    tabindex="0"
                    class="cursor-pointer focus:outline-none"
                    aria-label="top-face-{i}"
                    on:click={() => toggleGrid(i)}
                    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleGrid(i)}
            >
                <rect
                        x={Offset + (i % 3) * FaceSize}
                        y={Offset + Math.floor(i / 3) * FaceSize}
                        width="{FaceSize}"
                        height="{FaceSize}"
                        fill={getColor(val)}
                        stroke={FaceStrokeColor}
                        stroke-width={FaceStrokeWidth}
                />
            </g>
        {/each}

        <!--{#each topSide as val, i}-->
        <!--    <polygon-->
        <!--            points="{100 + i * 100},100 {200 + i * 100},100 {190 + i * 100},68 {110 + i * 100},68"-->
        <!--            fill={getColor(val)}-->
        <!--            stroke="#000"-->
        <!--            stroke-width="4"-->
        <!--            on:click={() => toggleTop(i)}-->
        <!--    />-->
        <!--{/each}-->
    </svg>
</div>