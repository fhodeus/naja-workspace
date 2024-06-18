/**
 * Checks if a file is external to the build by detecting whether
 * it is:
 *
 * 1. Including a ? in the request (meaning it is a request from a plugin)
 * 2. If we are building on windows and the directory begins with a letter followed by `:`
 * 3. If the file path is absolute eg. /Users/home/blah
 *
 * Note: This does not cover scenarios such as networked drives etc.
 *
 * @param id The requested file identifier (commonly a path or module request)
 */
export function isExternal(id: string) {
    if (id.includes('?') || id.includes(':')) {
        return false;
    }

    if (/^[A-Z]:\\/i.test(id) && process.platform === 'win32') {
        return false;
    }

    return !/^\.{0,2}[\/]/gi.test(id.replace(/\\/, '/'));
}
