<script lang="ts">
    import {RubiksCube} from "./models/rubiksCube.svelte.js";
    import {RubiksConstants} from "./models/rubiksConstants";

    // Shortcuts to change multiple faces (e.g. fill edges)

    type Props = {
        rubiksCube: RubiksCube
    }
    let {rubiksCube}: Props = $props();

    function onFillEdgesPressed() {
        let valueToFill: 0 | 1 = rubiksCube.allEdgesFilled() ? 0 : 1;
        rubiksCube.setAllEdges(valueToFill);
    }

    function onFillCornersPressed() {
        let valueToFill: 0 | 1 = rubiksCube.allCornersFilled() ? 0 : 1;
        rubiksCube.setAllCorners(valueToFill);
    }

    function onFillPiecesPressed() {
        let valueToFill: 0 | 1 = rubiksCube.allPiecesFilled() ? 0 : 1;
        rubiksCube.setAllPieces(valueToFill);
    }
</script>

<div class="grid grid-cols-[1fr_1fr] gap-2">
    <button class="btn btn-soft" disabled={rubiksCube.pllMode} onclick={onFillEdgesPressed}> Fill Edges</button>
    <button class="btn btn-soft" disabled={rubiksCube.pllMode} onclick={onFillCornersPressed}> Fill Corners</button>
    <button class="btn btn-soft col-span-2" disabled={rubiksCube.pllMode} onclick={onFillPiecesPressed}> Fill All</button>
</div>