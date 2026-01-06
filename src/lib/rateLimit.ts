// src/lib/rateLimit.ts

type Entry = {
  count: number;
  expiresAt: number;
};

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

const store = new Map<string, Entry>();

export function rateLimit(key: string) {
  const now = Date.now();
  const entry = store.get(key);

  // new window OR expired window
  if (!entry || now > entry.expiresAt) {
    store.set(key, {
      count: 1,
      expiresAt: now + WINDOW_MS,
    });

    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  // limit exceeded
  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  // increment
  entry.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
  };
}
