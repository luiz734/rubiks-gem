<script lang="ts">

    import {RubiksConstants} from "./models/RubiksConstants";
    import type {RubiksCube, SideLocation} from "./models/RubiksCube.svelte";

    type Props = {
        rubiksCube: RubiksCube,
        side: SideLocation
        // toggleSide: Function,
    }

    let { rubiksCube, side = $bindable() }: Props = $props();

</script>

{#each rubiksCube.getSideState(side) as val, i}
    <g
            role="button"
            tabindex="0"
            class="cursor-pointer focus:outline-none"
            aria-label="top-side-{i}"
            // onclick={() => rubiksCube}
            // onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && face.toggleValue(i)}
    >
        <polygon
                points={RubiksConstants.getTabPoints(side, i)}
                fill={RubiksConstants.getColor(val)}
                stroke={RubiksConstants.FaceStrokeColor}
                stroke-width={RubiksConstants.FaceStrokeWidth}
        />
    </g>
{/each}