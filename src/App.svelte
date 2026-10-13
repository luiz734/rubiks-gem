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
    import SubtitlesOptions from "./lib/SubtitlesOptions.svelte";
    import {EXPORT_MAX_SIZE, EXPORT_MIN_SIZE} from "./lib/models/export";


    let rubiksCube = $state(
        new RubiksCube("oll")
    );

    // let cubeDiv: HTMLDivElement | undefined = $state()

    $inspect(rubiksCube);

    let settings = new ExportSettings();
    let frame = $state<HTMLElement | undefined>();

    let card = "rounded-2xl border-2 border-base-100 bg-base-200"

</script>

<!--{["grid grid-cols-[min-content_1fr_400px] h-screen bg-black p-2 gap-2"], {smallScreen}}-->

<!--<div class={[-->
<!--   "flex flex-wrap bg-red-500 overflow-y-auto",-->
<!--   "xl:grid xl:grid-cols-[min-content_1fr_400px] xl:bg-blue-500",-->
<!--   "sm:bg-yellow-500",-->
<!--   "h-screen p-2 gap-2"-->
<!--]}>-->

    <div class={[
   "flex flex-wrap overflow-y-auto",
   "xl:grid xl:grid-cols-[min-content_1fr_400px]",
   "h-screen p-2 gap-2"
]}>

    <!--    First Column-->
    <div class="order-1 flex flex-col gap-y-2 flex-1">

        <div class="flex-1 flex flex-col gap-y-8 {card} p-4 items-center">
            <ExportFrame bind:frame {settings}>
                <RubikFace {rubiksCube}/>
            </ExportFrame>
            <ActiveModeToggle rubiksCube={rubiksCube}/>
        </div>

        <OptionsGroup
                description="Export as PNG from {EXPORT_MIN_SIZE}x{EXPORT_MIN_SIZE} to {EXPORT_MAX_SIZE}x{EXPORT_MAX_SIZE}."
                title="Export Options">
            <SaveOptions {settings} targetDiv={frame}/>
        </OptionsGroup>


    </div>

    <!--    Second COlumn -->
    <div class="order-3 xl:order-2 flex flex-wrap xl:h-full xl:w-full xl:overflow-y-auto gap-2">
        <OptionsGroup description="Control multiple faces at the same time." title="Faces">
            <FacesButtons rubiksCube={rubiksCube}/>
        </OptionsGroup>

        <OptionsGroup description="Rotate the current state." title="Rotation">
            <RotationSlider rubiksCube={rubiksCube}/>
        </OptionsGroup>

        <OptionsGroup description="Control how subtitles appear." title="Subtitles">
            <SubtitlesOptions {settings} targetDiv={frame}/>
        </OptionsGroup>

        <OptionsGroup description="Change colors of stikers, arrows and more." title="Colors">
            <CubeColors {settings} rubiksCube={rubiksCube}/>
        </OptionsGroup>

        <OptionsGroup description="Change strokes width." title="Strokes">
            <CubeStrokes rubiksCube={rubiksCube}/>
        </OptionsGroup>


    </div>

    <!--    Third Column-->
    <div class="order-2 xl:order-3 flex flex-1 min-h-0 h-120 sm:h-full  ">
        <OptionsGroup description="Add or remove lists in PLL mode." title="Arrows">
            <ArrowsList rubiksCube={rubiksCube}/>
        </OptionsGroup>
    </div>

</div>