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

export function renderExport(frame: HTMLElement, size: number): Promise<Blob | null> {
    return toBlob(frame, {
        pixelRatio: 1,
        canvasWidth: size,
        canvasHeight: size,
    })
}