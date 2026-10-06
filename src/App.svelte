<script lang="ts">
    import RubikFace from "./lib/RubikFace.svelte";
    import FacesButtons from "./lib/FacesButtons.svelte";
    import {RubiksCube} from "./lib/models/RubiksCube.svelte";
    import RotationSlider from "./lib/RotationSlider.svelte";
    import ActiveModeToggle from "./lib/ActiveModeToggle.svelte";
    import OptionsGroup from "./lib/OptionsGroup.svelte";
    import ArrowsList from "./lib/ArrowsList.svelte";


    let rubiksCube = $state(
        new RubiksCube("oll")
    );

    $inspect(rubiksCube);

</script>

<div class="flex flex-row bg-base-200 w-screen h-screen gap-0">

    <div class="flex flex-col p-4">
        <ActiveModeToggle rubiksCube={rubiksCube}/>
        <div class="card card-border p-8">
            <RubikFace rubiksCube={rubiksCube}/>
        </div>
    </div>

    <div class="flex flex-row p-4 bg-base-300 gap-4 flex-1">
        <div class="grid grid-cols-1 md:grid-cols-2 flex-1 gap-4 content-start">
            <OptionsGroup description="Control multiple faces at the same time." title="Faces">
                <FacesButtons rubiksCube={rubiksCube}/>
            </OptionsGroup>

            <OptionsGroup description="Rotate the current state." title="Rotation">
                <RotationSlider rubiksCube={rubiksCube}/>
            </OptionsGroup>
        </div>

        <OptionsGroup description="Add or remove lists in PLL mode." title="Arrows">
            <ArrowsList rubiksCube={rubiksCube}/>
        </OptionsGroup>
    </div>


</div>
