<script lang="ts">
    import {RubiksConstants as K} from "./models/RubiksConstants";
    import type {RubiksCube} from "./models/RubiksCube.svelte";

    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

    const center = (i: number) => ({
        x: K.GridOffset + (i % 3) * K.FaceSize + K.FaceSize / 2,
        y: K.GridOffset + Math.floor(i / 3) * K.FaceSize + K.FaceSize / 2,
    });

    // trim the ends so arrows don't cover the whole square
    function line(from: number, to: number) {
        const a = center(from), b = center(to);
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.hypot(dx, dy);
        const t = K.FaceSize * 0.25 / len;
        return {x1: a.x + dx * t, y1: a.y + dy * t, x2: b.x - dx * t, y2: b.y - dy * t};
    }
</script>

<defs>
    <marker id="arrowhead" markerHeight="4" markerWidth="4" orient="auto"
            refX="3" refY="2" viewBox="0 0 4 4">
        <path d="M0,0 L4,2 L0,4 z" fill="#2563eb"/>
    </marker>
</defs>

<g style="pointer-events: none">
    {#each rubiksCube.displayArrows as a}
        <line {...line(a.from, a.to)} stroke="#2563eb" stroke-width="4"
              marker-end="url(#arrowhead)"/>
    {/each}
</g>