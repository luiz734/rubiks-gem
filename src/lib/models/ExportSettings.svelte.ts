import { clampSize, type SubtitlePosition } from './export'


export class ExportSettings {
    size = $state(512)
    subtitle = $state('')
    position = $state<SubtitlePosition>('bottom')
    textColor = $state('#000000')
    transparent = $state(false)

    get effectiveSize() {
        return clampSize(this.size)
    }
}