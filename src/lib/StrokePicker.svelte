<script lang="ts">
    import {RotateCcw} from "@lucide/svelte"

    type Props = {
        width: number;
        defaultValue: number;
        label?: string;
        min?: number;
        max?: number;
    };

    let {
        width = $bindable(),
        defaultValue,
        label = 'Stroke',
        min = 0,
        max = 20,
    }: Props = $props();

    function onClickReset(): void {
        width = defaultValue;
    }
</script>

<fieldset class="flex flex-row items-center gap-2 flex-1 p-4">

    <div class="fieldset-legend text-sm flex-1 whitespace-nowrap">{label}</div>

    <div class="w-8 h-8 shrink-0">
        {#if defaultValue !== width}
            <button onclick={onClickReset}
                    aria-label="Reset {label}"
                    class="btn btn-link btn-sm p-0 text-base-content/20">
                <RotateCcw size={16}/>
            </button>
        {/if}
    </div>

    <input
            aria-label={label}
            bind:value={width}
            class="range range-xs w-32 shrink-0"
            {min}
            {max}
            step="1"
            type="range"
    />

    <span class="w-6 text-right text-sm tabular-nums shrink-0">{width}</span>

</fieldset>