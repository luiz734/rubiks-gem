<script lang="ts">
    import RubikFace from "./lib/RubikFace.svelte";
    import FacesButtons from "./lib/FacesButtons.svelte";
    import {RubiksCube} from "./lib/models/RubiksCube.svelte";
    import RotationSlider from "./lib/RotationSlider.svelte";
    import ActiveModeToggle from "./lib/ActiveModeToggle.svelte";
    import OptionsGroup from "./lib/OptionsGroup.svelte";


    let rubiksCube = $state(
        new RubiksCube("oll")
    );

    $inspect(rubiksCube);

</script>

<div class="flex flex-row bg-base-200 w-screen h-screen gap-0 content-start">

    <div class="flex flex-col p-8">
        <ActiveModeToggle rubiksCube={rubiksCube}/>
        <div class="card card-border p-8">
            <RubikFace rubiksCube={rubiksCube}/>
        </div>
    </div>

    <div class="flex flex-row p-8 bg-base-300 w-screen h-screen gap-16 content-start flex-wrap">
        <OptionsGroup description="Control multiple faces at the same time." title="Faces">
            <FacesButtons rubiksCube={rubiksCube}/>
        </OptionsGroup>

        <OptionsGroup description="Rotate the current state." title="Rotation">
            <RotationSlider rubiksCube={rubiksCube}/>
        </OptionsGroup>
    </div>


</div>
