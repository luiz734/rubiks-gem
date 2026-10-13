<script lang="ts">
    import {RubiksConstants} from "./models/rubiksConstants";
    import AdjacentFace from "./AdjacentFace.svelte";
    import {RubiksCube} from "./models/rubiksCube.svelte.js";
    import Arrows from "./Arrows.svelte";

    // Draw all the faces, frontal and adjacent
    // Each frontal face DOESN'T have a separated component

    type Props = {
        rubiksCube: RubiksCube
        // cubeDiv: HTMLElement | undefined
    }
    let {
        rubiksCube = $bindable(),
        // cubeDiv = $bindable()
    }: Props = $props();

</script>

<div class="w-full h-full">
    <svg class="h-full w-full"
         viewBox="0 0 {RubiksConstants.ViewportSize} {RubiksConstants.ViewportSize}"
    >
        {#each rubiksCube.getFrontState() as val, i}
            <g
                    role="button"
                    tabindex="0"
                    class="cursor-pointer focus:outline-none"
                    aria-label="grid-{i}"
                    onclick={() => rubiksCube.clickFront(i)}
                    onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && rubiksCube.clickFront(i)}
            >
                <rect
                        x={RubiksConstants.GridOffset + (i % 3) * RubiksConstants.FaceSize}
                        y={RubiksConstants.GridOffset + Math.floor(i / 3) * RubiksConstants.FaceSize}
                        width={RubiksConstants.FaceSize}
                        height={RubiksConstants.FaceSize}
                        fill={rubiksCube.isPending(i) ? rubiksCube.getPendingColor() : rubiksCube.getColor(val)}
                        stroke={rubiksCube.isPending(i) ? 'orange' : 'red'}
                        stroke-width={rubiksCube.isPending(i) ? 4 : 0}
                />
            </g>

            <!--            internal lines-->
            {#each [1, 2] as n}
                <line x1={RubiksConstants.GridOffset + n * RubiksConstants.FaceSize}
                      y1={RubiksConstants.GridOffset}
                      x2={RubiksConstants.GridOffset + n * RubiksConstants.FaceSize}
                      y2={RubiksConstants.GridOffset + 3 * RubiksConstants.FaceSize}
                      stroke={RubiksConstants.FaceStrokeColor}
                      stroke-width={rubiksCube.strokes.inner}
                      pointer-events="none"/>
                <line x1={RubiksConstants.GridOffset}
                      y1={RubiksConstants.GridOffset + n * RubiksConstants.FaceSize}
                      x2={RubiksConstants.GridOffset + 3 * RubiksConstants.FaceSize}
                      y2={RubiksConstants.GridOffset + n * RubiksConstants.FaceSize}
                      stroke={RubiksConstants.FaceStrokeColor}
                      stroke-width={rubiksCube.strokes.inner}
                      pointer-events="none"/>
            {/each}
        {/each}

        {#if rubiksCube.mode === 'pll'}
            <Arrows {rubiksCube}/>
        {/if}

        {#if rubiksCube.mode === "oll"}
            <AdjacentFace rubiksCube={rubiksCube} side="top"/>
            <AdjacentFace rubiksCube={rubiksCube} side="right"/>
            <AdjacentFace rubiksCube={rubiksCube} side="bottom"/>
            <AdjacentFace rubiksCube={rubiksCube} side="left"/>
        {/if}

        <rect fill="none"
              height={RubiksConstants.FaceSize * 3}
              pointer-events="none"
              stroke={RubiksConstants.FaceStrokeColor}
              stroke-width={rubiksCube.strokes.outer}
              width={RubiksConstants.FaceSize * 3}
              x={RubiksConstants.GridOffset}
              y={RubiksConstants.GridOffset}/>

    </svg>
</div>