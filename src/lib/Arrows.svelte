<script lang="ts">
    import type {RubiksCube} from "./models/rubiksCube.svelte.js";
    import {arrowGeometry, cellCenter} from "./models/arrowGeometry";

    // Draws an arrow

    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

    const drawn = $derived(
        rubiksCube.displayArrows
            .map((a, _, all) => arrowGeometry(
                cellCenter(a.from), cellCenter(a.to), rubiksCube.arrowStyle,
                all.some((b) => b.from === a.to && b.to === a.from)))
            .filter((g) => g !== null)
    );
</script>

<g style="pointer-events: none">
    {#each drawn as g}
        <line {...g.shaft} stroke={rubiksCube.arrowStyle.color}
              stroke-width={rubiksCube.arrowStyle.width}/>
    {/each}
    {#each drawn as g}
        <polygon points={g.head} fill={rubiksCube.arrowStyle.headColor}/>
    {/each}
</g>