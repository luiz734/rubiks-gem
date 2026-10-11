<script lang="ts">
    import {Trash} from "@lucide/svelte";
    import {RubiksConstants as K} from "./models/RubiksConstants";
    import type {RubiksCube} from "./models/RubiksCube.svelte";
    import {arrowGeometry, cellCenter} from "./models/arrowGeometry";
    import {DEFAULT_COLORS} from "./models/RubiksCube.svelte";


    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

    const NAMES = [
        'top-left corner', 'top edge', 'top-right corner',
        'left edge', 'center', 'right edge',
        'bottom-left corner', 'bottom edge', 'bottom-right corner',
    ];

    const span = 3 * K.FaceSize;
    const viewBox = `${K.GridOffset} ${K.GridOffset} ${span} ${span}`;

    let scroller: HTMLDivElement | undefined = $state();
    let prevCount = 0;

    $effect(() => {
        const count = rubiksCube.arrowGroups.length;   // the only dependency
        if (count > prevCount) {
            scroller?.scrollTo({top: scroller.scrollHeight, behavior: 'smooth'});
        }
        prevCount = count;
    });

    function icon(from: number, to: number, double: boolean) {
        const s = rubiksCube.arrowStyle;
        const pairs = double ? [[from, to], [to, from]] : [[from, to]];
        return pairs
            .map(([a, b]) => arrowGeometry(cellCenter(a), cellCenter(b), s, double))
            .filter((g) => g !== null);
    }

    function redOrBlue(isActive: boolean) {
        return isActive ? 'fill-primary/40' : 'fill-base-100'
    }
</script>

<div class="flex flex-col gap-y-1 flex-1 justify-between min-h-0">
    <div bind:this={scroller} class="flex flex-col gap-y-4 overflow-y-auto flex-1">
        {#each rubiksCube.arrowGroups as g (g.srcFrom + '-' + g.srcTo)}
            {@const double = g.kind === 'double'}
            {@const parts = icon(g.from, g.to, double)}
            <div class="flex items-center gap-x-2 bg-base-100 p-1">
                <svg class="w-20 h-20 shrink-0 bg-base-200" {viewBox}>
                    {#each Array(9) as _, i}
                        <rect x={K.GridOffset + (i % 3) * K.FaceSize}
                              y={K.GridOffset + Math.floor(i / 3) * K.FaceSize}
                              width={K.FaceSize} height={K.FaceSize}
                              stroke="currentColor" stroke-opacity="0.3"
                              class={redOrBlue(i === g.from || i === g.to)}/>
                    {/each}
                    {#each parts as p}
                        <line {...p.shaft} stroke={DEFAULT_COLORS.arrow}
                              stroke-width={rubiksCube.arrowStyle.width}/>
                    {/each}
                    {#each parts as p}
                        <polygon points={p.head} fill={DEFAULT_COLORS.arrow}/>
                    {/each}
                </svg>

                <div class="flex flex-col grow min-w-0">
                    <div class="font-bold">{double ? 'Double Arrow' : 'Single Arrow'}</div>
                    <div class="text-base-content/80 text-sm">
                        {#if double}
                            Between {NAMES[g.from]} and {NAMES[g.to]}.
                        {:else}
                            From {NAMES[g.from]} to {NAMES[g.to]}.
                        {/if}
                    </div>
                </div>

                <button class="btn btn-ghost btn-square btn-sm" aria-label="Delete arrow"
                        onclick={() => rubiksCube.removeArrow(g.srcFrom, g.srcTo)}>
                    <Trash/>
                </button>
            </div>
        {:else}
            <div class="text-base-content/60 p-2">No arrows yet. Click two pieces to add one.</div>
        {/each}
    </div>
    <button class="btn btn-error mt-6" onclick={() => {rubiksCube.removeAllArrows() }}> Remove All</button>
</div>