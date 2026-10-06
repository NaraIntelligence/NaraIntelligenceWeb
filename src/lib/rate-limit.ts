/**
 * Sliding-window rate limit kept in memory.
 *
 * Good enough for a contact form: it stops one client hammering the endpoint.
 * On Vercel each warm function instance keeps its own map, so the real limit
 * across instances is looser than `limit` — move this to a shared store
 * (Upstash, Vercel KV…) if the form ever becomes a target.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return function check(key: string, now = Date.now()) {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

    // Sweep stale keys now and then so the map can't grow without bound.
    if (hits.size > 5000) {
      for (const [k, times] of hits) {
        if (times.every((t) => now - t >= windowMs)) hits.delete(k);
      }
    }

    if (recent.length >= limit) {
      hits.set(key, recent);
      const retryAfterMs = windowMs - (now - recent[0]);
      return { ok: false as const, retryAfter: Math.ceil(retryAfterMs / 1000) };
    }

    recent.push(now);
    hits.set(key, recent);
    return { ok: true as const };
  };
}
