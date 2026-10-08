<script lang="ts">
    import type {RubiksCube} from "./models/RubiksCube.svelte";
    import ColorPicker from "./ColorPicker.svelte";

    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

    const defaultStickerColor = "#FFE600";
    const defaultEmptyColor = "#1f1f1f";
    const defaultArrowColor = "#0020FF";

    let stickerColor = $state("#FFE600");
    let emptyColor = $state("#1f1f1f");
    let arrowColor = $state("#0020FF");
    let transparentBg = $state(false);

</script>

<div class="flex flex-col gap-4">

    <div class="flex flex-col flex-1 border rounded-2xl border-base-content/10 divide-y divide-base-content/10 my-4">
        <ColorPicker bind:color={stickerColor} defaultValue={defaultStickerColor} label="Sticker Color"/>
        <ColorPicker bind:color={emptyColor} defaultValue={defaultEmptyColor} label="Empty Color"/>
        <ColorPicker bind:color={arrowColor} defaultValue={defaultArrowColor} label="Arrow Color"/>
    </div>


    <label>
        <input bind:checked={transparentBg} class="checkbox" type="checkbox"/>
        Transparent Background
    </label>
</div>