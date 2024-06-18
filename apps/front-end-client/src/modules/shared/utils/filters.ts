/**
 * Predicate for checking if a value is non-null.
 * Usefull for filtering gql arrays.
 * @param value
 * @returns
 */
export function exists<T>(value: T): value is NonNullable<typeof value> {
    return !!value;
}
