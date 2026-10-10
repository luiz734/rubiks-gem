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
            const blob = await renderExport(targetDiv, {
                size: settings.effectiveSize,
                subtitle: settings.subtitle,
                position: settings.position,
                transparent: settings.transparent,
                textColor: settings.textColor,
            })
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

    <select class="select" bind:value={settings.position}>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
    </select>

    <input type="number" min={EXPORT_MIN_SIZE} max={EXPORT_MAX_SIZE} step="1"
           class="input w-24" bind:value={settings.size} />

    <input type="text" class="input" placeholder="Subtitle (optional)"
           bind:value={settings.subtitle} />

    <button class="btn btn-success" disabled={!targetDiv} onclick={onClickDownload}> Download</button>
</div>