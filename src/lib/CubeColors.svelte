<script lang="ts">
    import type {RubiksCube} from "./models/rubiksCube.svelte.js";
    import {DEFAULT_COLORS} from "./models/rubiksCube.svelte.js";
    import ColorPicker from "./ColorPicker.svelte";

    // Group color pickers for the cube

    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

</script>

<div class="flex flex-col gap-4">

    <div class="flex flex-col flex-1 border rounded-2xl border-base-content/10 divide-y divide-base-content/10 my-4">
        <ColorPicker bind:color={rubiksCube.colors.sticker} defaultValue={DEFAULT_COLORS.sticker}
                     label="Sticker Color"/>
        <ColorPicker bind:color={rubiksCube.colors.empty} defaultValue={DEFAULT_COLORS.empty} label="Empty Color"/>
        <ColorPicker bind:color={rubiksCube.arrowColor} defaultValue={DEFAULT_COLORS.arrow} label="Arrow Color"/>
    </div>


    <label>
        <input bind:checked={rubiksCube.transparentBg} class="checkbox" type="checkbox"/>
        Transparent Background
    </label>
</div>