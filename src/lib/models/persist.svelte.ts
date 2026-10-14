export interface Persistable {
    serialize(): unknown
    restore(data: unknown): void
}
const VERSION = 1

export function persist(key: string, target: Persistable, delay = 300) {
    try {
        const raw = localStorage.getItem(key)
        if (raw) {
            const parsed = JSON.parse(raw)
            if (parsed?.v === VERSION) {
                target.restore(parsed.data)
            }
        }
    } catch (e) {
        console.warn(`Could not load "${key}"`, e)
    }

    $effect(() => {
        const json = JSON.stringify({ v: VERSION, data: target.serialize() })
        const timer = setTimeout(() => {
            try {
                localStorage.setItem(key, json)
            } catch (e) {
                console.warn(`Could not save "${key}"`, e)
            }
        }, delay)
        return () => clearTimeout(timer)
    })
}
