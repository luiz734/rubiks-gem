<script lang="ts">
    import {RotateCcw} from "@lucide/svelte"


    type Props = {
        color: string;
        defaultValue: string;
        label?: string;
    };

    let {color = $bindable(), defaultValue, label = 'Color'}: Props = $props();

    function getContrastColor(hexColor: string) {
        const hex = hexColor.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? "#000000" : "#ffffff";
    }

    function onClickReset(): void {
        color = defaultValue;
    }
</script>

<fieldset class="flex flex-col flex-1">
    <legend class="fieldset-legend text-sm">{label}</legend>

    <div class="flex flex-1 flex-row  gap-x-8">
        <label class="btn flex-1 justify-between relative cursor-pointer max-w-60"
               style:background-color={color}
               style:color={getContrastColor(color)}>
            <span>{color}</span>
            <input
                    bind:value={color}
                    class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    type="color"
            />
        </label>
        <div class=" flex-1 text-right max-w-32">
            {#if defaultValue !== color}
                <button onclick={onClickReset}
                        class="btn btn-link underline text-base-content/20">
                    reset default
                </button>
            {/if}
        </div>

    </div>
</fieldset>