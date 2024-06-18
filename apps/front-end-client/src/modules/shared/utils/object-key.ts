export function KeysOfObject<T extends object>(object: T): Array<keyof T> {
    return Object.keys(object) as Array<keyof T>;
}