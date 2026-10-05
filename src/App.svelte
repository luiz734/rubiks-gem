<script lang="ts">
    import {Skull} from '@lucide/svelte';
    import svelteLogo from './assets/svelte.svg'
    import RubikFace from "./lib/RubikFace.svelte";
    import FacesButtons from "./lib/FacesButtons.svelte";
    import {AdjacentFacets, FrontFace, RubiksCube} from "./lib/models/RubiksCube.svelte";

    let topSide: AdjacentFacets = new AdjacentFacets("top", [0, 1, 0]);
    let rightSide: AdjacentFacets = new AdjacentFacets("right", [0, 0, 0]);
    let bottomSide: AdjacentFacets = new AdjacentFacets("bottom", [0, 0, 0]);
    let leftSide: AdjacentFacets = new AdjacentFacets("left", [0, 0, 0]);

    let frontSide: FrontFace = new FrontFace([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    let rubiksCube = $state(
        new RubiksCube(frontSide, topSide, rightSide, bottomSide, leftSide)
    );


</script>

<div class="flex flex-row p-8" id="app">
    <RubikFace rubiksCube={rubiksCube}/>
    <FacesButtons rubiksCube={rubiksCube}/>
</div>
