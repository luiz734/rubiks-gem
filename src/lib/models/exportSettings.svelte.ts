import type { Persistable } from './persist.svelte'
import { clampSize } from './export'
import { HEX_COLOR_REGEX } from './colors'

export const CAPTION_POSITIONS = ['top', 'bottom'] as const
export type CaptionPosition = (typeof CAPTION_POSITIONS)[number]
export function isCaptionPosition(value: unknown): value is CaptionPosition {
    return CAPTION_POSITIONS.includes(value as CaptionPosition)
}

export function isHexColor(value: string | null | undefined): boolean {
    return value !== null && value !== undefined && HEX_COLOR_REGEX.test(value)
}

export class ExportSettings implements Persistable {
    size = $state(512)
    caption = $state('')
    captionBold = $state(true)
    position = $state<CaptionPosition>('bottom')
    textColor = $state('#000000')
    transparent = $state(false)

    get effectiveSize() {
        return clampSize(this.size)
    }

    serialize() {
        return {
            size: this.size,
            caption: this.caption,
            captionBold: this.captionBold,
            position: this.position,
            textColor: this.textColor,
            transparent: this.transparent,
        }
    }

    restore(data: any) {
        if (typeof data?.size === 'number' && Number.isFinite(data.size))
            this.size = data.size

        if (typeof data?.caption === 'string') this.caption = data.caption

        if (typeof data?.captionBold === 'boolean') this.captionBold = data.captionBold

        if (isCaptionPosition(data?.position)) this.position = data.position

        if (isHexColor(data?.textColor)) this.textColor = data.textColor

        if (typeof data?.transparent === 'boolean')
            this.transparent = data.transparent
    }
}
