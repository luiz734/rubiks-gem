import { RubiksConstants as K } from './rubiksConstants'

export type Point = { x: number; y: number };

export const cellCenter = (i: number): Point => ({
    x: K.GridOffset + (i % 3) * K.FaceSize + K.FaceSize / 2,
    y: K.GridOffset + Math.floor(i / 3) * K.FaceSize + K.FaceSize / 2,
});

const HEAD_LENGTH = 2.0;
const HEAD_HALF_WIDTH = 1.5;

export function arrowGeometry(
    a: Point, b: Point,
    s: { width: number; offset: number },
    hasReverse: boolean,
) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy);

    const headLen = s.width * HEAD_LENGTH;
    const startInset = s.offset + (hasReverse ? headLen : 0);
    if (len - startInset - s.offset <= headLen) return null;

    const ux = dx / len, uy = dy / len;
    const start = { x: a.x + ux * startInset, y: a.y + uy * startInset };
    const tip   = { x: b.x - ux * s.offset,   y: b.y - uy * s.offset };
    const base  = { x: tip.x - ux * headLen,  y: tip.y - uy * headLen };
    const px = -uy * s.width * HEAD_HALF_WIDTH;
    const py =  ux * s.width * HEAD_HALF_WIDTH;

    return {
        shaft: { x1: start.x, y1: start.y,
            x2: base.x + ux * headLen * 0.2, y2: base.y + uy * headLen * 0.2 },
        head: `${tip.x},${tip.y} ${base.x + px},${base.y + py} ${base.x - px},${base.y - py}`,
    };
}