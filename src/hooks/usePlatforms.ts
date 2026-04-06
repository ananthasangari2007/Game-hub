import { useEffect, useState } from "react";
import { PLATFORMS, type PlatformOption } from "../services/game-service";

interface UsePlatformsResult {
  data: PlatformOption[];
  loading: boolean;
}

function usePlatforms(): UsePlatformsResult {
  const [data, setData] = useState<PlatformOption[]>([]);

  useEffect(() => {
    setData(PLATFORMS);
  }, []);

  return { data, loading: false };
}

export default usePlatforms;
