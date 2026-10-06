<script lang="ts">

    import {RubiksConstants} from "./models/RubiksConstants";
    import AdjacentFace from "./AdjacentFace.svelte";
    import {RubiksCube} from "./models/RubiksCube.svelte";

    type Props = {
        rubiksCube: RubiksCube
    }
    let {rubiksCube = $bindable()}: Props = $props();

</script>

<div class="">
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
                        fill={RubiksConstants.getColor(val)}
                        stroke={RubiksConstants.FaceStrokeColor}
                        stroke-width={RubiksConstants.FaceStrokeWidth}
                />
            </g>
        {/each}

        {#if rubiksCube.mode === "oll"}
            <AdjacentFace rubiksCube={rubiksCube} side="top"/>
            <AdjacentFace rubiksCube={rubiksCube} side="right"/>
            <AdjacentFace rubiksCube={rubiksCube} side="bottom"/>
            <AdjacentFace rubiksCube={rubiksCube} side="left"/>
        {/if}

    </svg>
</div>