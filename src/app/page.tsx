import Container from "@/app/_components/container";
import{ LiveList } from "@/app/_components/live-list";
import lives from "@/data/lives.json";

export default function index() {
  const sorted = [...lives].sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <main>
      <Container>
        <div className="my-8 flex flex-col gap-2 sm:my-12 sm:flex-row sm:items-center
        sm:justify-between">
          <h1 className="text-2xl font-bold sm:text-5xl">FSD ライブ動画</h1>
        <a
          href="https://forksonglive-haisin.amebaownd.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sm underline hover:text-blue-600 sm:text-base"
          >
            {"FSD配信がかり's Ownd はこちら"}
          </a>

        </div>

        <LiveList lives={sorted} />
      </Container>
    </main>
  );
}