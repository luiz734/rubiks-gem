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

</script>

<div class="flex flex-col gap-y-2">

    <div class="grid grid-cols[50px_50px] flex-1">
        <input bind:value={settings.size} class="input" max={EXPORT_MAX_SIZE} min={EXPORT_MIN_SIZE}
               step="1" type="number"/>
        <button class="btn btn-success" disabled={!targetDiv} onclick={onClickDownload}> Download</button>
    </div>

</div>