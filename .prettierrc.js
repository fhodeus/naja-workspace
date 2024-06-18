module.exports = {
    printWidth: 100,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
    htmlWhitespaceSensitivity: 'ignore',
    quoteProps: 'consistent',
    overrides: [
        {
            files: '*.{yml,yaml,conf,avsc,sh,xml,csproj,props}',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
