<script lang="ts">

    import type {RubiksCube} from "./models/RubiksCube.svelte";

    type Props = {
        rubiksCube: RubiksCube
    }
    let {rubiksCube = $bindable()}: Props = $props();

</script>

<div class="w-100">
    <div class="join">
        <input aria-label="oll" bind:group={rubiksCube.mode} class="join-item btn" name="options" type="radio"
               value="oll"/>
        <input aria-label="pll" bind:group={rubiksCube.mode} class="join-item btn" name="options" type="radio"
               value="pll"/>
    </div>
</div>