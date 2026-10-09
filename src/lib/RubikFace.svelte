<script lang="ts">

    import {RubiksConstants} from "./models/RubiksConstants";
    import AdjacentFace from "./AdjacentFace.svelte";
    import {RubiksCube} from "./models/RubiksCube.svelte";
    import Arrows from "./Arrows.svelte";

    type Props = {
        rubiksCube: RubiksCube
    }
    let {rubiksCube = $bindable()}: Props = $props();

</script>

<div class="bg-base-content p-4">
    <svg height={RubiksConstants.ViewportSize}
         viewBox="0 0 {RubiksConstants.ViewportSize} {RubiksConstants.ViewportSize}"
         width={RubiksConstants.ViewportSize}>
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
                        fill={rubiksCube.getColor(val)}
                        stroke={rubiksCube.isPending(i) ? 'orange' : 'none'}
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