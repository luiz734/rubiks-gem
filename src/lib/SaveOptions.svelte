<script lang="ts">
    import type {ExportSettings} from "./models/exportSettings.svelte.js";
    import {EXPORT_MAX_SIZE, EXPORT_MIN_SIZE, renderExport} from "./models/export";
    import {RotateCcw} from "@lucide/svelte";

    // Temporary: export/save options

    type Props = {
        targetDiv: HTMLElement | undefined
        settings: ExportSettings
        filename?: string
    }
    let {targetDiv, settings, filename = 'cube.png'}: Props = $props()

    async function onClickDownload() {
        if (!targetDiv) return

        try {
            const blob = await renderExport(targetDiv, settings.size)
            if (!blob) return

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.download = filename
            link.href = url
            link.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Could not export image', error)
        }
    }

    function onClickReset(): void {
        settings.subtitle = "";
    }
</script>

<div class="flex flex-col gap-y-2">

    <div class="flex flex-col flex-1 border rounded-2xl border-base-content/10 divide-y divide-base-content/10 my-4">

        <div class="grid grid-cols-[minmax(100px,auto)_32px_minmax(0,75%)] p-4 content-center">
            <div class="fieldset-legend text-sm">Position</div>
            <div></div>
            <select bind:value={settings.position} class="select w-auto">
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
            </select>
        </div>

        <div class="grid grid-cols-[minmax(100px,auto)_32px_minmax(0,75%)] p-4 content-center">
            <div class="fieldset-legend text-sm">Subtitle</div>
            {@render resetIcon()}
            <input bind:value={settings.subtitle} class="input w-auto" placeholder="Subtitle (optional)"
                   type="text"/>
        </div>
    </div>

    <div class="grid grid-cols[50px_50px] flex-1">
        <input bind:value={settings.size} class="input" max={EXPORT_MAX_SIZE} min={EXPORT_MIN_SIZE}
               step="1" type="number"/>
        <button class="btn btn-success" disabled={!targetDiv} onclick={onClickDownload}> Download</button>
    </div>

</div>

{#snippet resetIcon()}
    <div class="max-w-32 h-8 -ml-4">
        {#if settings.subtitle !== ""}
            <button onclick={onClickReset}
                    class="btn btn-link  text-base-content/20">
                <RotateCcw class="-m-t-2" size={16}/>
            </button>
        {/if}
    </div>
{/snippet}