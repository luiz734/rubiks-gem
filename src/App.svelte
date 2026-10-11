<script lang="ts">
    import RubikFace from "./lib/RubikFace.svelte";
    import FacesButtons from "./lib/FacesButtons.svelte";
    import {RubiksCube} from "./lib/models/rubiksCube.svelte.js";
    import RotationSlider from "./lib/RotationSlider.svelte";
    import ActiveModeToggle from "./lib/ActiveModeToggle.svelte";
    import OptionsGroup from "./lib/OptionsGroup.svelte";
    import ArrowsList from "./lib/ArrowsList.svelte";
    import CubeColors from "./lib/CubeColors.svelte";
    import CubeStrokes from "./lib/CubeStrokes.svelte";
    import SaveOptions from "./lib/SaveOptions.svelte";
    import {ExportSettings} from "./lib/models/exportSettings.svelte.js";
    import ExportFrame from "./lib/ExportFrame.svelte";


    let rubiksCube = $state(
        new RubiksCube("oll")
    );

    // let cubeDiv: HTMLDivElement | undefined = $state()

    $inspect(rubiksCube);

    let settings = new ExportSettings();
    let frame = $state<HTMLElement | undefined>();

</script>

<div class="flex flex-row bg-base-300 w-screen h-screen gap-4 p-4">

    <div class="flex flex-col p-4 justify-between rounded-2xl border border-base-100 bg-base-200">
        <div class="flex flex-col">
            <ActiveModeToggle rubiksCube={rubiksCube}/>

            <ExportFrame {settings} bind:frame>
                <RubikFace {rubiksCube}/>
            </ExportFrame>
<!--            <div class="card card-border p-8">-->
<!--                <RubikFace bind:cubeDiv={cubeDiv} rubiksCube={rubiksCube}/>-->
<!--            </div>-->
        </div>
        <SaveOptions targetDiv={frame} {settings}  />
    </div>

    <div class="flex flex-row bg-base-300 gap-4 flex-1 min-w-0">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] flex-2 min-w-0 gap-4 content-start overflow-auto">
            <OptionsGroup description="Control multiple faces at the same time." title="Faces">
                <FacesButtons rubiksCube={rubiksCube}/>
            </OptionsGroup>

            <OptionsGroup description="Rotate the current state." title="Rotation">
                <RotationSlider rubiksCube={rubiksCube}/>
            </OptionsGroup>

            <OptionsGroup description="Change colors of stikers, arrows and more." title="Colors">
                <CubeColors rubiksCube={rubiksCube}/>
            </OptionsGroup>

            <OptionsGroup description="Change strokes width." title="Strokes">
                <CubeStrokes rubiksCube={rubiksCube}/>
            </OptionsGroup>
        </div>

        <OptionsGroup description="Add or remove lists in PLL mode." title="Arrows">
            <ArrowsList rubiksCube={rubiksCube}/>
        </OptionsGroup>
    </div>


</div>
