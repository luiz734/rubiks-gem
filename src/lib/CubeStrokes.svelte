<script lang="ts">
    import type {RubiksCube} from "./models/rubiksCube.svelte.js";
    import SliderPicker from "./SliderPicker.svelte";

    // Group sliders for strokes

    type Props = {
        rubiksCube: RubiksCube;
    };

    let {rubiksCube}: Props = $props();

    const defaultOuterStroke = 4;
    const defaultInnerStroke = 4;
    const defaultAdjacentStroke = 4;
</script>

<div class="flex flex-col gap-4">
    <div class="flex flex-col flex-1 border rounded-2xl border-base-content/10 divide-y divide-base-content/10 my-4">
        <SliderPicker bind:width={rubiksCube.strokes.outer}
                      defaultValue={defaultOuterStroke}
                      label="Outer Stroke"/>
        <SliderPicker bind:width={rubiksCube.strokes.inner}
                      defaultValue={defaultInnerStroke}
                      label="Inner Stroke"/>
        <SliderPicker bind:width={rubiksCube.strokes.adjacent}
                      defaultValue={defaultAdjacentStroke}
                      label="Adjacent Stroke"/>
    </div>
</div>