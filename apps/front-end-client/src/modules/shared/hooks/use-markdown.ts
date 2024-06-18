import { useMemo } from 'react';

import { marked } from 'marked';

/**
 * Hook to parse markdown content into its tokens.
 * @param content
 * @returns
 */
export function useMarkdown(content: string | marked.TokensList) {
    const tokens = useMemo(() => {
        if (typeof content !== 'string') {
            return content;
        }

        return marked.lexer(content);
    }, [content]);
    return tokens;
}

/**
 * Gets the resulting HTML from the tokens.
 *
 * @warning !DANGER! Do NOT use this hook with untrusted content.
 * @param tokens
 * @returns
 */
export function useMarkdownHTML(tokens: ReturnType<typeof useMarkdown>) {
    return useMemo(() => {
        return marked.parser(tokens);
    }, [tokens]);
}
