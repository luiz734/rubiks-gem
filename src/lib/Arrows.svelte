<script lang="ts">
    import {RubiksConstants as K} from "./models/RubiksConstants";
    import type {RubiksCube} from "./models/RubiksCube.svelte";

    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

    const center = (i: number) => ({
        x: K.GridOffset + (i % 3) * K.FaceSize + K.FaceSize / 2,
        y: K.GridOffset + Math.floor(i / 3) * K.FaceSize + K.FaceSize / 2,
    });

    const HEAD_LENGTH = 2.0;
    const HEAD_HALF_WIDTH = 1.5;

    function geometry(
        from: number, to: number,
        s: { width: number; offset: number },
        hasReverse: boolean,
    ) {
        const a = center(from), b = center(to);
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.hypot(dx, dy);

        const headLen = s.width * HEAD_LENGTH;
        // with a reverse arrow, the opposite head occupies the start of this arrow
        const startInset = s.offset + (hasReverse ? headLen : 0);
        const visible = len - startInset - s.offset;
        if (visible <= headLen) {
            console.error("arrow is to small")
            return null;
        }

        const ux = dx / len, uy = dy / len;
        const start = {x: a.x + ux * startInset, y: a.y + uy * startInset};
        const tip = {x: b.x - ux * s.offset, y: b.y - uy * s.offset};
        const base = {x: tip.x - ux * headLen, y: tip.y - uy * headLen};

        const px = -uy * s.width * HEAD_HALF_WIDTH;
        const py = ux * s.width * HEAD_HALF_WIDTH;

        return {
            shaft: {
                x1: start.x, y1: start.y,
                x2: base.x + ux * headLen * 0.2, y2: base.y + uy * headLen * 0.2
            },
            head: `${tip.x},${tip.y} ${base.x + px},${base.y + py} ${base.x - px},${base.y - py}`,
        };
    }

    const drawn = $derived(
        rubiksCube.displayArrows
            .map((a, _, all) => {
                const hasReverse = all.some((b) => b.from === a.to && b.to === a.from);
                return geometry(a.from, a.to, rubiksCube.arrowStyle, hasReverse);
            })
            .filter((g) => g !== null)
    );
</script>

<g style="pointer-events: none">
    <!-- all shafts first -->
    {#each drawn as g}
        <line {...g.shaft}
              stroke={rubiksCube.arrowStyle.color}
              stroke-width={rubiksCube.arrowStyle.width}/>
    {/each}
    <!-- then all heads, always on top -->
    {#each drawn as g}
        <polygon points={g.head} fill={rubiksCube.arrowStyle.headColor}/>
    {/each}
</g>