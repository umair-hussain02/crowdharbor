import { useCallback, useEffect, useRef, useState } from 'react';

interface UsePollingOptions {
  intervalMs?: number;
  // Extra dependency values — when any of these change, polling restarts and
  // an immediate (non-background) fetch runs right away.
  deps?: unknown[];
}

// Plain setInterval + fetch polling — no SWR/React Query/WebSockets, since
// none of those are installed in this project. The fetcher is held in a ref
// so the interval always calls the latest version without needing to be
// re-created (avoids the classic "fetcher changes every render" infinite loop).
export function usePolling<T>(fetcher: () => Promise<T>, options: UsePollingOptions = {}) {
  const { intervalMs = 20000, deps = [] } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(async (background: boolean) => {
    if (!background) setLoading(true);
    setError('');

    try {
      const result = await fetcherRef.current();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load data.');
    } finally {
      if (!background) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(false);

    const intervalId = setInterval(() => {
      // Pause polling while the tab/window isn't visible.
      if (typeof document === 'undefined' || document.visibilityState === 'visible') {
        load(true);
      }
    }, intervalMs);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        load(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, intervalMs, ...deps]);

  return { data, loading, error, lastUpdated, refresh: () => load(false) };
}
