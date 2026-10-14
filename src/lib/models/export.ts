import { toBlob } from 'html-to-image'

export const EXPORT_MIN_SIZE = 64
export const EXPORT_MAX_SIZE = 1024
const BAND_RATIO = 0.12

export type CaptionPosition = 'top' | 'bottom'

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
    return Math.min(
        EXPORT_MAX_SIZE,
        Math.max(EXPORT_MIN_SIZE, Math.round(value))
    )
}

export function computeLayout(
    requestedSize: number,
    caption: string,
    position: CaptionPosition
): ExportLayout {
    const size = clampSize(requestedSize)
    const bandHeight = caption.trim() ? Math.round(size * BAND_RATIO) : 0
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

export function renderExport(
    frame: HTMLElement,
    size: number
): Promise<Blob | null> {
    return toBlob(frame, {
        pixelRatio: 1,
        canvasWidth: size,
        canvasHeight: size,
    })
}
