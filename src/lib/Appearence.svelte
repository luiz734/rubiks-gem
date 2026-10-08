<script lang="ts">
    import type {RubiksCube} from "./models/RubiksCube.svelte";
    import ColorPicker from "./models/ColorPicker.svelte";

    let {rubiksCube}: { rubiksCube: RubiksCube } = $props();

    const defaultStickerColor = "#FFE600";
    const defaultEmptyColor = "#1f1f1f";

    let stickerColor = $state("#FFE600");
    let emptyColor = $state("#1f1f1f");
</script>

<div class="flex flex-col gap-4">
    <ColorPicker bind:color={stickerColor} defaultValue={defaultStickerColor} label="Sticker Color" />
    <ColorPicker bind:color={emptyColor}  defaultValue={defaultEmptyColor} label="Empty Color" />
</div>