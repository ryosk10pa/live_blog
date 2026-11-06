import Container from "@/app/_components/container";
import lives from "@/data/lives.json";
import { notFound } from "next/navigation";
import { BackLinks } from "@/app/_components/back-links";
import { getYear } from "@/lib/lives";

export function generateStaticParams() {
    return lives.map((live) => ({
        slug: live.slug,
    }));
    }

export default async function LivePage(props: {
    params: Promise<{ slug: string }>;
}) {
const { slug } = await props.params;
const live = lives.find((l) => l.slug === slug);
    if (!live) {
        notFound();
    }

    return (
        <main>
            <Container>
                <BackLinks backHref={`/years/${getYear(live)}`} />
                    <h1 className="mt-6 text-3xl font-bold">{live.title}</h1>
                    <p className="mt-1 text-neutral-500">{live.date}</p>

                    <ul className="mb-16 mt-8 space-y-3">
                        {live.videos.map((video) => (
                            <li key={video.id} className="rounded border border-neutral-300 p-4">
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-lg font-bold underline hover:text-blue-600"
                                    >
                                    {video.title}
                                </a>
                                {video.tags.length > 0 && (
                                    <p className="mt-1 text-sm text-neutral-500">
                                        {video.tags.join("、")}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
            </Container>
        </main>
    );
}