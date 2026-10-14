<script lang="ts">
    import {RubiksConstants} from "./models/rubiksConstants";
    import type {RubiksCube, SideLocation} from "./models/rubiksCube.svelte.js";

    // Faces on the side of the cube

    type Props = { rubiksCube: RubiksCube; side: SideLocation };
    let {rubiksCube, side}: Props = $props();   // no $bindable needed
</script>

{#each rubiksCube.getSideState(side) as val, i}
    <g
            role="button"
            tabindex="0"
            class="cursor-pointer focus:outline-none"
            aria-label="{side}-side-{i}"
            onclick={() => rubiksCube.clickSide(side, i)}
            onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && rubiksCube.clickSide(side, i)}
    >
        <polygon
                points={RubiksConstants.getTabPoints(side, i)}
                fill={rubiksCube.getStickerColor(val)}
                stroke={RubiksConstants.FaceStrokeColor}
                stroke-width={rubiksCube.strokes.adjacent}
        />
    </g>
{/each}