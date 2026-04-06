import axios from "axios";
import { useEffect, useState } from "react";
import { fetchGames, type Game, type GameQuery } from "../services/game-service";

interface UseGamesResult {
  data: Game[];
  loading: boolean;
  loadingMore: boolean;
  error: string;
  count: number;
  hasNextPage: boolean;
}

function useGames(query: GameQuery, page: number): UseGamesResult {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadGames = async () => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError("");

        const response = await fetchGames(query, page, controller.signal);
        setCount(response.count);
        setData((current) => (page === 1 ? response.results : [...current, ...response.results]));
      } catch (err) {
        if (axios.isCancel(err) || controller.signal.aborted) {
          return;
        }

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong while loading games.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };

    void loadGames();

    return () => controller.abort();
  }, [page, query]);

  return {
    data,
    loading,
    loadingMore,
    error,
    count,
    hasNextPage: data.length < count,
  };
}

export default useGames;
