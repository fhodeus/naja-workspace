export function loadScript(url: string) {
    return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        script.addEventListener('load', () => resolve());
        script.addEventListener('error', () => reject());

        document.body.appendChild(script);
    });
}
