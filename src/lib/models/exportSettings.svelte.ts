import type { Persistable } from './persist.svelte'
import { clampSize } from './export'

export const SUBTITLE_POSITIONS = ['top', 'bottom'] as const
export type SubtitlePosition = (typeof SUBTITLE_POSITIONS)[number]
export function isSubtitlePosition(value: unknown): value is SubtitlePosition {
    return SUBTITLE_POSITIONS.includes(value as SubtitlePosition)
}
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

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

        if (
            typeof data?.textColor === 'string' &&
            HEX_COLOR.test(data.textColor)
        )
            this.textColor = data.textColor

        if (typeof data?.transparent === 'boolean')
            this.transparent = data.transparent
    }
}
