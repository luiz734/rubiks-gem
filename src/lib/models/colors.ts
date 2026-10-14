export const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/

export class ColorUtils {
    private static parse(hex: string): [number, number, number] {
        let h = hex.replace('#', '')
        if (h.length === 3) h = [...h].map((c) => c + c).join('')
        return [
            parseInt(h.substring(0, 2), 16),
            parseInt(h.substring(2, 4), 16),
            parseInt(h.substring(4, 6), 16),
        ]
    }

    private static toHex(r: number, g: number, b: number): string {
        const part = (v: number) =>
            Math.round(Math.min(255, Math.max(0, v)))
                .toString(16)
                .padStart(2, '0')
        return `#${part(r)}${part(g)}${part(b)}`
    }

    private static rgbToHsl(
        r255: number,
        g255: number,
        b255: number
    ): [number, number, number] {
        const r = r255 / 255
        const g = g255 / 255
        const b = b255 / 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const l = (max + min) / 2
        const d = max - min

        let hue = 0
        let sat = 0

        if (d !== 0) {
            sat = d / (1 - Math.abs(2 * l - 1))
            switch (max) {
                case r:
                    hue = ((g - b) / d) % 6
                    break
                case g:
                    hue = (b - r) / d + 2
                    break
                default:
                    hue = (r - g) / d + 4
            }
            hue *= 60
            if (hue < 0) hue += 360
        }

        return [hue, sat, l]
    }

    private static hslToHex(hue: number, sat: number, l: number): string {
        const c = (1 - Math.abs(2 * l - 1)) * sat
        const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
        const m = l - c / 2

        let [r, g, b] = [0, 0, 0]
        if (hue < 60) [r, g, b] = [c, x, 0]
        else if (hue < 120) [r, g, b] = [x, c, 0]
        else if (hue < 180) [r, g, b] = [0, c, x]
        else if (hue < 240) [r, g, b] = [0, x, c]
        else if (hue < 300) [r, g, b] = [x, 0, c]
        else [r, g, b] = [c, 0, x]

        return ColorUtils.toHex((r + m) * 255, (g + m) * 255, (b + m) * 255)
    }

    static invert(hex: string): string {
        const [r, g, b] = ColorUtils.parse(hex)
        return ColorUtils.toHex(255 - r, 255 - g, 255 - b)
    }

    static complementary(hex: string): string {
        const [r, g, b] = ColorUtils.parse(hex)
        const [hue, sat, l] = ColorUtils.rgbToHsl(r, g, b)
        return ColorUtils.hslToHex((hue + 180) % 360, sat, l)
    }

    static shift(hex: string, amount = 0.15, threshold = 0.5): string {
        const [r, g, b] = ColorUtils.parse(hex)
        const [hue, sat, l] = ColorUtils.rgbToHsl(r, g, b)
        const shifted = l > threshold ? l - amount : l + amount
        return ColorUtils.hslToHex(hue, sat, Math.min(1, Math.max(0, shifted)))
    }
}
