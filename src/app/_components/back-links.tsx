import Link from "next/link";

type Props = {
    backHref: string;
};

export function BackLinks({ backHref }: Props) {
    return (
        <nav className="flex gap-4 text-sm mb-6">
            <Link href="/" className="underline hover:opacity-70">
            HOMEへ戻る
            </Link>
            <Link href={backHref} className="underline hover:opacity-70">
            一つ前に戻る
            </Link>
        </nav>
    )
}