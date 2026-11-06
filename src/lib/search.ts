export function aimaiSearch(text: string): string{
    return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u30a1-\u30f6]/g, (ch) =>
        String.fromCharCode(ch.charCodeAt(0) - 0x60)
);
}