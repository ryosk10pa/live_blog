//lives.jsonの取り込み
import livesData from "@/data/lives.json";
import { count } from "console";

//型の設定
export type Video = {
    id: string | number;
    title: string;
    url?: string;
    tags?: string[];
};

export type Live = {
    slug: string;
    title: string;
    date: string;
    videos: Video[];
};

//読み込んだデータをLiveに入れて扱う
const lives = livesData as Live[];

//getAllLives関数、ソートして日付順にする
export function getAllLives(): Live[] {
    return [...lives].sort((a, b) => b.date.localeCompare(a.date));
}

//getYear関数 日付の先頭４文字を年として取り出す
export function getYear(live: Live): string{
    return live.date.slice(0, 4);
}

//年の一覧とその年のライブ数の取得
export function getYears(): { year: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const live of getAllLives()) {
    const year = getYear(live);
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  return [...counts.entries()].map(([year, count]) => ({ year, count }));
}

//getLivesByYear関数 指定した年のライブを新しい順で取得
export function getLivesByYear(year: string): Live[] {
    return getAllLives().filter((live) => getYear(live) === year);
}

//getLiveBySlug関数 slugからライブを探す
export function getLiveBySlug(slug: string): Live | undefined {
    return lives.find((live) => live.slug === slug);
}
