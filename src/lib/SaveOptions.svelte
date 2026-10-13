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

    const outOfRange = $derived(settings.size !== settings.effectiveSize)

</script>

<div class="flex flex-col gap-y-2  flex-1">

    <div class="flex flex-col gap-y-2">
        <label class="fieldset-legend text-sm shrink-0" for="export-width">Size</label>
        <label class="input w-full" class:input-warning={outOfRange}>
            <input aria-label="Image size in pixels"
                   bind:value={settings.size}
                   max={EXPORT_MAX_SIZE}
                   min={EXPORT_MIN_SIZE}
                   name="export-width"
                   onblur={() => (settings.size = settings.effectiveSize)}
                   step="1"
                   type="number"/>
            <span class="label">px</span>
        </label>
    </div>

    <div class="flex-1"></div>

    <button class="btn btn-success" class:btn-disabled={outOfRange} disabled={!targetDiv} onclick={onClickDownload}>
        Download
    </button>


</div>