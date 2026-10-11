<script lang="ts">
    import {RotateCcw} from "@lucide/svelte"

    // Color picker UI input

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

<fieldset class="flex flex-row flex-1 p-4 content-center">

    <div class="fieldset-legend text-sm flex-1">{label}</div>

    <div class="flex-0 max-w-32 h-8">
        {#if defaultValue !== color}
            <button onclick={onClickReset}
                    class="btn btn-link  text-base-content/20">
                <RotateCcw class="-m-t-2" size={16}/>
                <!--                reset-->
            </button>
        {/if}
    </div>

    <label class="btn flex-1 relative cursor-pointer max-w-30 w-10 h-8"
           style:background-color={color}
           style:color={getContrastColor(color)}>
        <span>{color}</span>
        <input
                bind:value={color}
                class="absolute inset-0 cursor-pointer opacity-0"
                type="color"
        />
    </label>


</fieldset>