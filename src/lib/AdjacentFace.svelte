<script lang="ts">

    import {AdjacentFacets} from "./models/RubiksCube";
    import {RubiksConstants} from "./models/RubiksConstants";

    type Props = {
        face: AdjacentFacets,
        toggleSide: Function,
    }

    let { face = $bindable(), toggleSide }: Props = $props();

</script>

{#each face.values as val, i}
    <g
            role="button"
            tabindex="0"
            class="cursor-pointer focus:outline-none"
            aria-label="top-side-{i}"
            onclick={() => toggleSide('top', i)}
            onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSide('top', i)}
    >
        <polygon
                points={RubiksConstants.getTabPoints('top', i)}
                fill={RubiksConstants.getColor(val)}
                stroke={RubiksConstants.FaceStrokeColor}
                stroke-width={RubiksConstants.FaceStrokeWidth}
        />
    </g>
{/each}