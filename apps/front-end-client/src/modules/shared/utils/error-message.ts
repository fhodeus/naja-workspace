import type { FieldError } from 'react-hook-form';

import { slugify } from '../../shared/utils/strings';

export function createErrorMessage<T>(prefix: string) {
    return (
        errors: Partial<Record<keyof T, FieldError | undefined>>,
        errorType: keyof T,
    ): string => {
        const message = errors?.[errorType]?.message;
        const type = errors?.[errorType]?.type;
        if (message) {
            return message;
        } else if (type) {
            return `${prefix}.${slugify(type)}`;
        }
        return '';
    };
}
