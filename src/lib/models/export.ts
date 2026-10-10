import {toBlob} from "html-to-image";

export const EXPORT_MIN_SIZE = 64
export const EXPORT_MAX_SIZE = 1024
const BAND_RATIO = 0.1
const TEXT_RATIO = 0.6
const TEXT_MAX_WIDTH_RATIO = 0.94

export type SubtitlePosition = 'top' | 'bottom'

export type ExportLayout = {
    size: number
    cubeSide: number
    cubeX: number
    cubeY: number
    bandY: number
    bandHeight: number
}

export function clampSize(value: number): number {
    if (!Number.isFinite(value)) return EXPORT_MIN_SIZE
    return Math.min(EXPORT_MAX_SIZE, Math.max(EXPORT_MIN_SIZE, Math.round(value)))
}

export function computeLayout(
    requestedSize: number,
    subtitle: string,
    position: SubtitlePosition,
): ExportLayout {
    const size = clampSize(requestedSize)
    const bandHeight = subtitle.trim() ? Math.round(size * BAND_RATIO) : 0
    const cubeSide = size - bandHeight
    const cubeY = position === 'top' ? bandHeight : 0
    return {
        size,
        cubeSide,
        cubeX: Math.floor((size - cubeSide) / 2),
        cubeY,
        bandY: position === 'top' ? 0 : cubeSide,
        bandHeight,
    }
}

export type RenderOptions = {
    size: number
    subtitle: string
    position: SubtitlePosition
    transparent: boolean
    textColor: string
}

export async function renderExport(el: HTMLElement, o: RenderOptions): Promise<Blob | null> {
    const layout = computeLayout(o.size, o.subtitle, o.position)
    const background = getComputedStyle(el).backgroundColor

    const cubeBlob = await toBlob(el, {
        pixelRatio: layout.cubeSide / el.offsetWidth,
        style: o.transparent ? {background: 'transparent'} : {},
    })
    if (!cubeBlob) return null
    const cube = await createImageBitmap(cubeBlob)

    const canvas = document.createElement('canvas')
    canvas.width = layout.size
    canvas.height = layout.size
    const ctx = canvas.getContext('2d')!

    if (!o.transparent) {
        ctx.fillStyle = background
        ctx.fillRect(0, 0, layout.size, layout.size)
    }

    ctx.drawImage(cube, layout.cubeX, layout.cubeY, layout.cubeSide, layout.cubeSide)

    if (layout.bandHeight > 0) {
        let fontSize = layout.bandHeight * TEXT_RATIO
        const maxWidth = layout.size * TEXT_MAX_WIDTH_RATIO
        ctx.font = `${fontSize}px sans-serif`
        const measured = ctx.measureText(o.subtitle).width
        if (measured > maxWidth) {
            fontSize *= maxWidth / measured
            ctx.font = `${fontSize}px sans-serif`
        }
        ctx.fillStyle = o.textColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(o.subtitle, layout.size / 2, layout.bandY + layout.bandHeight / 2)
    }

    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}