import { notFound } from "next/navigation";
import { getLivesByYear } from "@/lib/lives";
import Link from "next/link";
import { BackLinks } from "@/app/_components/back-links";

type Props = {
    params :Promise<{ year: string }>;
};

export default async function YearPage({params} : Props) {
    const { year } = await params;
    const lives = getLivesByYear(year);
    if (lives.length === 0) notFound();

    return (
        <main className="max-w-3x1 mx-auto px-4 py-8">
            <BackLinks backHref="/" />
            <h1 className="text-2x1 font-hold mb-6">{year}年のライブ</h1>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lives.map((live) => (
          <li key={live.slug}>
            <Link
              href={`/lives/${live.slug}`}
              className="block border rounded p-4 hover:bg-gray-100"
            >
              <div className="text-sm opacity-70">{live.date}</div>
              <div className="font-bold"> {live.title}</div>
              <div className="text-sm opacity-70">{live.videos.length}本</div>
            </Link>
          </li>
        ))}
      </ul>
        </main>
    );
}