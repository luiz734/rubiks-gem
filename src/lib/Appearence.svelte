<script lang="ts">
    import type {RubiksCube} from "./models/RubiksCube.svelte";
    import ColorPicker from "./models/ColorPicker.svelte";

    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

    const defaultStickerColor = "#FFE600";
    const defaultEmptyColor = "#1f1f1f";

    let stickerColor = $state("#FFE600");
    let emptyColor = $state("#1f1f1f");
    let transparentBg = $state(false);

</script>

<div class="flex flex-col gap-4">

    <div class="flex flex-col flex-1 border rounded-2xl border-base-content/10 divide-y divide-base-content/10 my-4">
        <ColorPicker bind:color={stickerColor} defaultValue={defaultStickerColor} label="Sticker Color"/>
        <ColorPicker bind:color={emptyColor} defaultValue={defaultEmptyColor} label="Empty Color"/>
    </div>


    <label>
        <input bind:checked={transparentBg} class="checkbox" type="checkbox"/>
        Transparent Background
    </label>
</div>