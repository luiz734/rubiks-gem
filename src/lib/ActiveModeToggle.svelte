<script lang="ts">

    import type {RubiksCube} from "./models/RubiksCube.svelte";

    type Props = {
        rubiksCube: RubiksCube
    }
    let {rubiksCube = $bindable()}: Props = $props();

</script>

<div class="w-full">
    <div class="join w-full">
        <input aria-label="oll" bind:group={rubiksCube.mode} class="join-item btn flex-1 disabled:btn-soft!" name="options" type="radio"
               value="oll"/>
        <input aria-label="pll" bind:group={rubiksCube.mode} class="join-item btn flex-1" name="options" type="radio"
               value="pll"/>
    </div>
</div>