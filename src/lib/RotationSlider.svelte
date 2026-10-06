<script lang="ts">
    import {RotateCcw, RotateCw} from "@lucide/svelte"
    import {type RotationAngle, RubiksCube} from "./models/RubiksCube.svelte";

    type Props = {
        rubiksCube: RubiksCube
    }
    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

    function rotateCw(): void {
        rubiksCube.rotation = Math.min(270, rubiksCube.rotation + 90) as RotationAngle;
    }

    function rotateCcw(): void {
        rubiksCube.rotation = Math.max(0, rubiksCube.rotation - 90) as RotationAngle;
    }

    function reset(): void {
        rubiksCube.rotation = 0;
    }

</script>

<div class="w-60 flex flex-col gap-4">
    <div class="w-full max-w-xs">
        <div class="flex justify-between px-2.5 mt-2 text-sm">
            <span>0</span>
            <span>90</span>
            <span>180</span>
            <span>270</span>
        </div>
        <input class="range range-sm" max="270" min="0" step="90" type="range" bind:value={rubiksCube.rotation}/>
    </div>

    <div class="flex flex-row w-full justify-between">
        <button class="btn btn-soft" onclick={() => rubiksCube.rotateBy(-90)}><RotateCcw/></button>
        <button class="btn btn-soft" onclick={() => (rubiksCube.rotation = 0)}>Reset</button>
        <button class="btn btn-soft" onclick={() => rubiksCube.rotateBy(90)}><RotateCw/></button>
    </div>
</div>