<script lang="ts">
    import type {ExportSettings} from "./models/ExportSettings.svelte";
    import {EXPORT_MAX_SIZE, EXPORT_MIN_SIZE, renderExport} from "./models/export";

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

    <select bind:value={settings.position} class="select">
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
    </select>

    <input bind:value={settings.size} class="input w-24" max={EXPORT_MAX_SIZE} min={EXPORT_MIN_SIZE}
           step="1" type="number"/>

    <input bind:value={settings.subtitle} class="input" placeholder="Subtitle (optional)"
           type="text"/>

    <button class="btn btn-success" disabled={!targetDiv} onclick={onClickDownload}> Download</button>
</div>