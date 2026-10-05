<script lang="ts">

    import {RubiksCube} from "./models/RubiksCube.svelte";
    import {RubiksConstants} from "./models/RubiksConstants";

    type Props = {
        rubiksCube: RubiksCube
    }
    let {rubiksCube}: Props = $props();

    function onFillEdgesPressed() {
        let valueToFill: 0|1 = rubiksCube.allEdgesFilled() ? 0 : 1;
        rubiksCube.setAllEdges(valueToFill);
    }
</script>

<div class="flex flex-col">
    <button class="btn" onclick={onFillEdgesPressed}> Fill Edges </button>
    <button class="btn"> Fill Corners </button>
    <button class="btn"> Fill All </button>
</div>