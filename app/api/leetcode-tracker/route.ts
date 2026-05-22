import { NextResponse } from "next/server";

type LeetCodeApiResponse = {
  progress?: Record<
    string,
    {
      daily?: Record<string, number>;
    }
  >;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const upstream = await fetch(
    `https://leetcode-api-140473619582.us-central1.run.app/api/user/${encodeURIComponent(username)}`,
    {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 900 },
    }
  );

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Unable to fetch LeetCode data" },
      { status: upstream.status }
    );
  }

  const data = (await upstream.json()) as LeetCodeApiResponse;
  const daily = Object.values(data.progress ?? {}).reduce<Record<string, number>>(
    (accumulator, yearData) => {
      for (const [date, count] of Object.entries(yearData.daily ?? {})) {
        accumulator[date] = count;
      }

      return accumulator;
    },
    {}
  );

  return NextResponse.json({
    username,
    daily,
  });
}