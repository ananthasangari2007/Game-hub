import { useEffect, useState } from "react";
import { GENRES, type Genre } from "../services/game-service";

interface UseGenresResult {
  data: Genre[];
  loading: boolean;
}

function useGenres(): UseGenresResult {
  const [data, setData] = useState<Genre[]>([]);

  useEffect(() => {
    setData(GENRES);
  }, []);

  return { data, loading: false };
}

export default useGenres;
