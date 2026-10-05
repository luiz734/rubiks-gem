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
    function onFillCornersPressed() {
        let valueToFill: 0|1 = rubiksCube.allCornersFilled() ? 0 : 1;
        rubiksCube.setAllCorners(valueToFill);
    }
    function onFillPiecesPressed() {
        let valueToFill: 0|1 = rubiksCube.allPiecesFilled() ? 0 : 1;
        rubiksCube.setAllPieces(valueToFill);
    }
</script>

<div class="flex flex-col">
    <button class="btn" onclick={onFillEdgesPressed}> Fill Edges </button>
    <button class="btn" onclick={onFillCornersPressed}> Fill Corners </button>
    <button class="btn" onclick={onFillPiecesPressed}> Fill All </button>
</div>