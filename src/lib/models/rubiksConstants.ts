import type { SideLocation } from './rubiksCube.svelte.js'

export class RubiksConstants {
    public static readonly FaceSize = 100
    public static readonly TabDepth = 32
    public static readonly FaceStrokeColor = '#000'
    public static readonly GridCells = 3
    public static readonly GridSize =
        RubiksConstants.FaceSize * RubiksConstants.GridCells
    public static readonly InsetRatio = 0.1
    public static readonly Inset =
        RubiksConstants.FaceSize * RubiksConstants.InsetRatio
    public static readonly StrokeMargin = 10
    public static readonly ViewportSize =
        RubiksConstants.GridSize +
        RubiksConstants.TabDepth * 2 +
        RubiksConstants.StrokeMargin * 2

    public static readonly GridOffset =
        RubiksConstants.StrokeMargin + RubiksConstants.TabDepth

    public static getTabPoints(side: SideLocation, i: number): string {
        const { GridOffset, GridSize, FaceSize, TabDepth, Inset } =
            RubiksConstants

        if (side === 'top') {
            const x0 = GridOffset + i * FaceSize
            const x1 = x0 + FaceSize
            const y0 = GridOffset
            const yTop = y0 - TabDepth
            return `${x0},${y0} ${x1},${y0} ${x1 - Inset},${yTop} ${x0 + Inset},${yTop}`
        }
        if (side === 'bottom') {
            const x0 = GridOffset + i * FaceSize
            const x1 = x0 + FaceSize
            const y1 = GridOffset + GridSize
            const yBot = y1 + TabDepth
            return `${x0},${y1} ${x1},${y1} ${x1 - Inset},${yBot} ${x0 + Inset},${yBot}`
        }
        if (side === 'left') {
            const y0 = GridOffset + i * FaceSize
            const y1 = y0 + FaceSize
            const x0 = GridOffset
            const xLeft = x0 - TabDepth
            return `${x0},${y0} ${x0},${y1} ${xLeft},${y1 - Inset} ${xLeft},${y0 + Inset}`
        }
        if (side === 'right') {
            const y0 = GridOffset + i * FaceSize
            const y1 = y0 + FaceSize
            const x1 = GridOffset + GridSize
            const xRight = x1 + TabDepth
            return `${x1},${y0} ${x1},${y1} ${xRight},${y1 - Inset} ${xRight},${y0 + Inset}`
        }
        return ''
    }
}
