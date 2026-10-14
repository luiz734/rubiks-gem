import type { Persistable } from './persist.svelte'
import { clampSize } from './export'
import { HEX_COLOR_REGEX } from './colors'

export const SUBTITLE_POSITIONS = ['top', 'bottom'] as const
export type SubtitlePosition = (typeof SUBTITLE_POSITIONS)[number]
export function isSubtitlePosition(value: unknown): value is SubtitlePosition {
    return SUBTITLE_POSITIONS.includes(value as SubtitlePosition)
}

export function isHexColor(value: string | null | undefined): boolean {
    return value !== null && value !== undefined && HEX_COLOR_REGEX.test(value)
}

export class ExportSettings implements Persistable {
    size = $state(512)
    subtitle = $state('')
    position = $state<SubtitlePosition>('bottom')
    textColor = $state('#000000')
    transparent = $state(false)

    get effectiveSize() {
        return clampSize(this.size)
    }

    serialize() {
        return {
            size: this.size,
            subtitle: this.subtitle,
            position: this.position,
            textColor: this.textColor,
            transparent: this.transparent,
        }
    }

    restore(data: any) {
        if (typeof data?.size === 'number' && Number.isFinite(data.size))
            this.size = data.size

        if (typeof data?.subtitle === 'string') this.subtitle = data.subtitle

        if (isSubtitlePosition(data?.position)) this.position = data.position

        if (isHexColor(data?.textColor)) this.textColor = data.textColor

        if (typeof data?.transparent === 'boolean')
            this.transparent = data.transparent
    }
}
