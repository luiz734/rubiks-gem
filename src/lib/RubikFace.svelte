<script lang="ts">
    import {RubiksCube, AdjacentFacets, FrontFace} from "./models/RubiksCube.svelte.js";
    import {RubiksConstants} from "./models/RubiksConstants";
    import AdjacentFace from "./AdjacentFace.svelte";

    let topSide: AdjacentFacets = new AdjacentFacets("top", [0, 1, 0]);
    let rightSide: AdjacentFacets = new AdjacentFacets("right", [0, 0, 0]);
    let bottomSide: AdjacentFacets = new AdjacentFacets("bottom", [0, 0, 0]);
    let leftSide: AdjacentFacets = new AdjacentFacets("left", [0, 0, 0]);
    let frontSide: FrontFace = new FrontFace([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    let rubiksCube = $state(
        new RubiksCube(frontSide, topSide, rightSide, bottomSide, leftSide)
    );

</script>

<div class="p-8">
    <svg height={RubiksConstants.ViewportSize}
         viewBox="0 0 {RubiksConstants.ViewportSize} {RubiksConstants.ViewportSize}"
         width={RubiksConstants.ViewportSize}>
        {#each rubiksCube.frontFace.values as val, i}
            <g
                    role="button"
                    tabindex="0"
                    class="cursor-pointer focus:outline-none"
                    aria-label="grid-{i}"
                    onclick={() => {
                        rubiksCube.toggleFace(i);
                        rubiksCube = rubiksCube;
                    }}
                    onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && rubiksCube.toggleFace(i)}
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

                <AdjacentFace face={topSide} />
    </svg>
</div>