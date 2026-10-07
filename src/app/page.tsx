import Container from "@/app/_components/container";
import{ LiveList } from "@/app/_components/live-list";
import lives from "@/data/lives.json";

export default function index() {
  const sorted = [...lives].sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <main>
      <Container>
        <h1 className="my-12 text-4x1 font-bold">FSD ライブ動画</h1>
        <LiveList lives={sorted} />
      </Container>
    </main>
  );
}