<script lang="ts">
    import {Skull} from '@lucide/svelte';
    import svelteLogo from './assets/svelte.svg'
    import RubikFace from "./lib/RubikFace.svelte";
    import FacesButtons from "./lib/FacesButtons.svelte";
    import {Piece, RubiksCube} from "./lib/models/RubiksCube.svelte";
    import RotationSlider from "./lib/RotationSlider.svelte";


    let rubiksCube = $state(
        new RubiksCube()
    );

    $inspect(rubiksCube);

</script>

<div class="flex flex-row p-8" id="app">
    <div class="card card-border p-8">
        <RubikFace rubiksCube={rubiksCube}/>
    </div>
    <FacesButtons rubiksCube={rubiksCube}/>
    <RotationSlider rubiksCube={rubiksCube}/>
</div>
