"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HISTORY_KEY = "trustlens_search_history";
const MAX_HISTORY = 6;

function readHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function writeHistory(items: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

export default function GlobalSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setHistory(readHistory());
  }, []);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredHistory = useMemo(() => {
    if (!query) return history;
    const lowered = query.toLowerCase();
    return history.filter((item) => item.toLowerCase().includes(lowered));
  }, [history, query]);

  function persistHistory(value: string) {
    const cleaned = value.trim();
    if (!cleaned) return;
    const next = [cleaned, ...history.filter((item) => item !== cleaned)].slice(
      0,
      MAX_HISTORY
    );
    setHistory(next);
    writeHistory(next);
  }

  function submitSearch(value: string) {
    const cleaned = value.trim();
    if (!cleaned) return;
    persistHistory(cleaned);
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", cleaned);
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  }

  function clearSearch() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
    setQuery("");
  }

  function removeHistoryItem(value: string) {
    const next = history.filter((item) => item !== value);
    setHistory(next);
    writeHistory(next);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitSearch(query);
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search scans and learnings"
          className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
        />
        {query ? (
          <button
            onClick={clearSearch}
            className="text-xs text-white/50 hover:text-white"
            type="button"
          >
            Clear
          </button>
        ) : null}
        <button
          onClick={() => submitSearch(query)}
          className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200 hover:bg-blue-500/20 transition"
          type="button"
        >
          Search
        </button>
      </div>

      {open && (filteredHistory.length > 0 || query) && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-white/10 bg-black/90 p-3 backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Recent</p>
          <div className="mt-2 space-y-2">
            {(filteredHistory.length > 0 ? filteredHistory : [query]).map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <button
                  onClick={() => submitSearch(item)}
                  className="text-left text-xs text-white/80 hover:text-white"
                  type="button"
                >
                  {item}
                </button>
                <button
                  onClick={() => removeHistoryItem(item)}
                  className="text-[11px] text-white/40 hover:text-white"
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
