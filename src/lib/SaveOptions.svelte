<script lang="ts">
    import { toPng} from "html-to-image";

    type Props = {
        targetDiv: HTMLElement | undefined
        transparent: boolean
        filename?: string
    }
    let {targetDiv, transparent = false, filename = 'cube.png'}: Props = $props()

    async function onClickDownload() {
        if (!targetDiv) return

        try {
            const dataUrl = await toPng(targetDiv, {
                pixelRatio: 2,
                style: transparent ? {background: 'transparent'} : {},
            })

            const link = document.createElement('a')
            link.download = filename
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error('Could not export image', error)
        }
    }
</script>

<div class="flex flex-col">
    <button class="btn btn-success"  onclick={onClickDownload}> Download</button>
</div>