"use client";

import Link from "next/link";
import { useState } from "react";

type Video = {
  id: string | number;
  title: string;
  url: string;
  tags: string[];
};

type Live = {
  slug: string;
  title: string;
  date: string;
  videos: Video[];
};

export function LiveList({ lives }: { lives: Live[] }) {
  const [keyword, setKeyword] = useState("");
  const q = keyword.trim().toLowerCase();

  // 検索用:全ライブの動画を、1つのリストにまとめる
  const allVideos = lives.flatMap((live) =>
    live.videos.map((video) => ({
      ...video,
      key: `${live.slug}-${video.id}`,
      liveTitle: live.title,
      date: live.date,
    }))
  );

  const results = allVideos.filter((v) =>
    [v.title, v.liveTitle, v.date, ...v.tags]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="キーワードで検索"
        className="w-full rounded border border-neutral-300 px-4 py-2 text-black"
      />

      {q === "" ? (
        // 検索していないとき:ライブのフォルダを表示
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {lives.map((live) => (
            <li key={live.slug}>
              <Link
                href={`/lives/${live.slug}`}
                className="block rounded border border-neutral-300 p-5 hover:border-blue-500"
              >
                <p className="text-lg font-bold">📁 {live.title}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {live.date} / {live.videos.length}本
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        // 検索中:動画の一覧を表示
        <>
          <p className="mt-4 text-sm text-neutral-500">{results.length}件</p>

          <ul className="mt-2 space-y-3">
            {results.map((v) => (
              <li key={v.key} className="rounded border border-neutral-300 p-4">
                <a
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-bold underline hover:text-blue-600"
                >
                  {v.title}
                </a>
                <p className="mt-1 text-sm text-neutral-500">
                  {v.date} / {v.liveTitle}
                  {v.tags.length > 0 && ` / ${v.tags.join("、")}`}
                </p>
              </li>
            ))}
          </ul>

          {results.length === 0 && (
            <p className="mt-6 text-neutral-500">
              該当するライブ映像がありません。
            </p>
          )}
        </>
      )}
    </div>
  );
}