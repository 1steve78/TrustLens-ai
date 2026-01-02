import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

const FEEDS = [
  "https://krebsonsecurity.com/feed/",
  "https://www.bleepingcomputer.com/feed/",
  "https://www.cisa.gov/cybersecurity-advisories/all.xml",
];

export async function GET() {
  try {
    const feedUrl =
      FEEDS[Math.floor(Math.random() * FEEDS.length)];

    const feed = await parser.parseURL(feedUrl);

    const tips = feed.items
      .slice(0, 10)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((item) => ({
        title: item.title,
        summary:
          item.contentSnippet?.slice(0, 120) ||
          "Stay alert and verify before trusting.",
        link: item.link,
      }));

    return NextResponse.json(tips);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}
