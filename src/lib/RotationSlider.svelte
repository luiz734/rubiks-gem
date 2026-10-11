<script lang="ts">
    import {RotateCcw, RotateCw} from "@lucide/svelte"
    import {type RotationAngle, RubiksCube} from "./models/rubiksCube.svelte.js";

    // Group rotation options

    type Props = {
        rubiksCube: RubiksCube
    }
    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

</script>

<div class="max-w-xs flex flex-col gap-4">
    <div class="w-full max-w-xs">
        <div class="flex justify-between px-2.5 mt-2 text-sm">
            <span>0</span>
            <span>90</span>
            <span>180</span>
            <span>270</span>
        </div>
        <input bind:value={rubiksCube.rotation} class="range range-sm" max="270" min="0" step="90" type="range"/>
    </div>

    <div class="flex flex-row w-full justify-between">
        <button class="btn btn-soft" onclick={() => rubiksCube.rotateBy(-90)}><RotateCcw/></button>
        <button class="btn btn-soft" onclick={() => (rubiksCube.rotation = 0)}>Reset</button>
        <button class="btn btn-soft" onclick={() => rubiksCube.rotateBy(90)}><RotateCw/></button>
    </div>
</div>