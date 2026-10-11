<script lang="ts">
    import type {Snippet} from "svelte";
    import {computeLayout} from "./models/export";
    import type {ExportSettings} from "./models/ExportSettings.svelte";

    type Props = {
        settings: ExportSettings
        frame?: HTMLElement | undefined
        children: Snippet
    }
    let {settings, frame = $bindable(), children}: Props = $props()

    let width = $state(0)

    const layout = $derived(
        computeLayout(settings.effectiveSize, settings.subtitle, settings.position)
    )
    const pct = (v: number) => `${(v / layout.size) * 100}%`

    const checkerboard =
        'background-color:#fff;' +
        'background-image:conic-gradient(#cfcfcf 25%, #fff 0 50%, #cfcfcf 0 75%, #fff 0);' +
        'background-size:16px 16px;'
</script>

<!-- outer: preview only (checkerboard + border), never exported -->
<div class="w-100 aspect-square border border-base-content/10"
     style={settings.transparent ? checkerboard : ''}>

    <!-- inner: this is exactly what gets exported -->
    <div bind:this={frame}
         bind:clientWidth={width}
         class="relative w-full h-full"
         style:background-color={settings.transparent ? 'transparent' : 'var(--color-base-content)'}>

        <div class="absolute"
             style:left={pct(layout.cubeX)} style:top={pct(layout.cubeY)}
             style:width={pct(layout.cubeSide)} style:height={pct(layout.cubeSide)}>
            {@render children()}
        </div>

        {#if layout.bandHeight > 0}
            <div class="absolute w-full flex items-center justify-center"
                 style:top={pct(layout.bandY)} style:height={pct(layout.bandHeight)}>
                <span class="max-w-[94%] truncate"
                      style:font-family="sans-serif"
                      style:color={settings.textColor}
                      style:font-size="{(layout.bandHeight / layout.size) * width * 0.6}px">
                    {settings.subtitle}
                </span>
            </div>
        {/if}
    </div>
</div>