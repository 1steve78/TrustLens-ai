import { NextResponse } from "next/server";
import { generateHashtags } from "@/lib/hashtag";

export async function POST(req: Request) {
  try {
    const { url, summary, riskLevel } = await req.json();

    if (!url || !riskLevel) {
      return NextResponse.json(
        { error: "Missing url or riskLevel" },
        { status: 400 }
      );
    }

    const hashtags = generateHashtags({
      url,
      summary,
      riskLevel,
    });

    return NextResponse.json({ hashtags });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate hashtags" },
      { status: 500 }
    );
  }
}
