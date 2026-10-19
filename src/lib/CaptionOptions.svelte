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
        settings.caption = "";
    }

    let clearVisible = $derived(settings.caption !== "")
</script>

<div class="flex flex-col gap-y-4">


    <div class="flex flex-col gap-y-2">
        <label class="fieldset-legend text-sm" for="sub-position">Position</label>
        <select bind:value={settings.position} class="select w-auto" name="sub-position">
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
        </select>
    </div>


    <div class="flex flex-col gap-y-2">
        <label class="fieldset-legend text-sm shrink-0" for="sub-value">Caption</label>

        <div class="relative flex flex-1">
            <input bind:value={settings.caption} class="input w-full pr-12" name="sub-value"
                   placeholder="Caption (optional)"
                   type="text"/>
            <div class="absolute -right-2 top-4 -translate-y-1/2">
                {@render resetIcon()}
            </div>
        </div>
    </div>

    <label>
        <input bind:checked={settings.captionBold} class="checkbox" type="checkbox" />
        Bold
    </label>
</div>

{#snippet clearButton()}
    <button class={["btn btn-link text-base-content/20", clearVisible ? "visible" : "invisible"]}
            onclick={onClickReset}>
        Clear
    </button>
{/snippet}


{#snippet resetIcon()}
    <div class="max-w-32 h-8">
        {#if settings.caption !== ""}
            <button onclick={onClickReset}
                    class="btn btn-link  text-base-content/20">
                <RotateCcw class="" size={16}/>
            </button>
        {/if}
    </div>
{/snippet}