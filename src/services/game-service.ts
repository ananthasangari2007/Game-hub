import type { AxiosRequestConfig } from "axios";
import apiClient, { hasRawgApiKey } from "./api-client";

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformOption {
  id: number;
  rawgId: number;
  name: string;
}

export interface GamePlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Game {
  id: number;
  name: string;
  background_image: string | null;
  rating: number;
  rating_top: number;
  parent_platforms: GamePlatform[];
  metacritic: number | null;
  released: string | null;
  genres?: Genre[];
}

export interface FetchResponse<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}

export interface GameQuery {
  searchText: string;
  selectedGenre: number | null;
  selectedPlatform: number | null;
  sortOrder: string;
}

export interface SortOption {
  label: string;
  value: string;
}

export const GENRES: Genre[] = [
  { id: 4, name: "Action", slug: "action" },
  { id: 51, name: "Indie", slug: "indie" },
  { id: 3, name: "Adventure", slug: "adventure" },
  { id: 5, name: "RPG", slug: "role-playing-games-rpg" },
  { id: 10, name: "Strategy", slug: "strategy" },
  { id: 2, name: "Shooter", slug: "shooter" },
  { id: 40, name: "Casual", slug: "casual" },
  { id: 14, name: "Simulation", slug: "simulation" },
  { id: 7, name: "Puzzle", slug: "puzzle" },
  { id: 11, name: "Arcade", slug: "arcade" },
  { id: 83, name: "Platformer", slug: "platformer" },
  { id: 1, name: "Racing", slug: "racing" },
  { id: 59, name: "Massively Multiplayer", slug: "massively-multiplayer" },
  { id: 15, name: "Sports", slug: "sports" },
  { id: 6, name: "Fighting", slug: "fighting" },
];

export const PLATFORMS: PlatformOption[] = [
  { id: 1, rawgId: 4, name: "PC" },
  { id: 2, rawgId: 187, name: "PlayStation" },
  { id: 3, rawgId: 1, name: "Xbox" },
  { id: 4, rawgId: 3, name: "iOS" },
  { id: 5, rawgId: 21, name: "Android" },
  { id: 6, rawgId: 5, name: "Macintosh" },
  { id: 7, rawgId: 6, name: "Linux" },
];

export const SORT_OPTIONS: SortOption[] = [
  { label: "Relevance", value: "" },
  { label: "Date added", value: "-added" },
  { label: "Name", value: "name" },
  { label: "Release date", value: "-released" },
  { label: "Popularity", value: "-metacritic" },
  { label: "Average rating", value: "-rating" },
];

const findGenreById = (id: number | null) => GENRES.find((genre) => genre.id === id);
const findPlatformById = (id: number | null) =>
  PLATFORMS.find((platform) => platform.id === id);

const platformEntries = (names: string[]): GamePlatform[] =>
  names.map((name, index) => ({
    platform: {
      id: index + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    },
  }));

const fallbackGames: Game[] = [
  {
    id: 3498,
    name: "Grand Theft Auto V",
    background_image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox"]),
    metacritic: 92,
    released: "2013-09-17",
    genres: [GENRES[0], GENRES[5]],
  },
  {
    id: 3328,
    name: "The Witcher 3: Wild Hunt",
    background_image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox", "Nintendo"]),
    metacritic: 92,
    released: "2015-05-18",
    genres: [GENRES[0], GENRES[3], GENRES[2]],
  },
  {
    id: 4200,
    name: "Portal 2",
    background_image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox", "Macintosh"]),
    metacritic: 95,
    released: "2011-04-18",
    genres: [GENRES[2], GENRES[8], GENRES[9]],
  },
  {
    id: 5286,
    name: "Tomb Raider (2013)",
    background_image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    rating: 4.3,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox", "Macintosh"]),
    metacritic: 86,
    released: "2013-03-05",
    genres: [GENRES[0], GENRES[2]],
  },
  {
    id: 5679,
    name: "The Elder Scrolls V: Skyrim",
    background_image:
      "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox"]),
    metacritic: 94,
    released: "2011-11-11",
    genres: [GENRES[3], GENRES[2]],
  },
  {
    id: 12020,
    name: "Left 4 Dead 2",
    background_image:
      "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.2,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "Xbox", "Linux"]),
    metacritic: 89,
    released: "2009-11-17",
    genres: [GENRES[5], GENRES[0]],
  },
  {
    id: 8877,
    name: "Red Dead Redemption 2",
    background_image:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox"]),
    metacritic: 96,
    released: "2018-10-26",
    genres: [GENRES[0], GENRES[2]],
  },
  {
    id: 9102,
    name: "Cyberpunk 2077",
    background_image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    rating: 4.1,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox"]),
    metacritic: 86,
    released: "2020-12-10",
    genres: [GENRES[0], GENRES[3]],
  },
  {
    id: 10444,
    name: "Hades",
    background_image:
      "https://images.unsplash.com/photo-1514329926535-7f6db2f4b3ef?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox", "Nintendo", "Macintosh"]),
    metacritic: 93,
    released: "2020-09-17",
    genres: [GENRES[1], GENRES[0], GENRES[9]],
  },
  {
    id: 11567,
    name: "Forza Horizon 5",
    background_image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "Xbox"]),
    metacritic: 91,
    released: "2021-11-09",
    genres: [GENRES[11], GENRES[13]],
  },
  {
    id: 12890,
    name: "Stardew Valley",
    background_image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox", "Android", "iOS"]),
    metacritic: 89,
    released: "2016-02-26",
    genres: [GENRES[1], GENRES[6], GENRES[7]],
  },
  {
    id: 13901,
    name: "Elden Ring",
    background_image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox"]),
    metacritic: 96,
    released: "2022-02-25",
    genres: [GENRES[0], GENRES[3]],
  },
  {
    id: 14770,
    name: "Resident Evil Village",
    background_image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    rating: 4.3,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox", "Macintosh"]),
    metacritic: 84,
    released: "2021-05-07",
    genres: [GENRES[5], GENRES[2]],
  },
  {
    id: 15221,
    name: "Minecraft",
    background_image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80",
    rating: 4.4,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox", "Android", "iOS"]),
    metacritic: 93,
    released: "2011-11-18",
    genres: [GENRES[2], GENRES[6], GENRES[7]],
  },
  {
    id: 16610,
    name: "FIFA 23",
    background_image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    rating: 4.0,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox"]),
    metacritic: 79,
    released: "2022-09-30",
    genres: [GENRES[13]],
  },
  {
    id: 17455,
    name: "No Man's Sky",
    background_image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    rating: 4.1,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox", "Macintosh"]),
    metacritic: 77,
    released: "2016-08-09",
    genres: [GENRES[2], GENRES[7]],
  },
  {
    id: 18803,
    name: "Street Fighter 6",
    background_image:
      "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=1200&q=80",
    rating: 4.4,
    rating_top: 5,
    parent_platforms: platformEntries(["PC", "PlayStation", "Xbox"]),
    metacritic: 92,
    released: "2023-06-02",
    genres: [GENRES[14], GENRES[0]],
  },
];

function sortGames(games: Game[], sortOrder: string) {
  const sorted = [...games];

  switch (sortOrder) {
    case "-added":
      return sorted.sort((a, b) => b.id - a.id);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "-released":
      return sorted.sort(
        (a, b) => new Date(b.released ?? 0).getTime() - new Date(a.released ?? 0).getTime(),
      );
    case "-metacritic":
      return sorted.sort((a, b) => (b.metacritic ?? 0) - (a.metacritic ?? 0));
    case "-rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

function filterFallbackGames(query: GameQuery): FetchResponse<Game> {
  const genre = findGenreById(query.selectedGenre);
  const platform = findPlatformById(query.selectedPlatform);
  const searchText = query.searchText.trim().toLowerCase();

  let games = fallbackGames.filter((game) => {
    const matchesSearch =
      searchText.length === 0 || game.name.toLowerCase().includes(searchText);
    const matchesGenre =
      !genre || game.genres?.some((gameGenre) => gameGenre.id === genre.id) === true;
    const matchesPlatform =
      !platform ||
      game.parent_platforms.some(({ platform: gamePlatform }) => gamePlatform.name === platform.name);

    return matchesSearch && matchesGenre && matchesPlatform;
  });

  games = sortGames(games, query.sortOrder);

  return {
    count: games.length,
    results: games,
  };
}

export async function fetchGames(query: GameQuery, page: number, signal?: AbortSignal) {
  if (!hasRawgApiKey) {
    const fallbackResponse = filterFallbackGames(query);
    const pageSize = 9;
    const start = (page - 1) * pageSize;
    const results = fallbackResponse.results.slice(start, start + pageSize);

    return {
      count: fallbackResponse.count,
      next: start + pageSize < fallbackResponse.count ? String(page + 1) : null,
      previous: page > 1 ? String(page - 1) : null,
      results,
    };
  }

  const genre = findGenreById(query.selectedGenre);
  const platform = findPlatformById(query.selectedPlatform);

  const config: AxiosRequestConfig = {
    signal,
    params: {
      page,
      page_size: 9,
      search: query.searchText || undefined,
      genres: genre?.slug,
      parent_platforms: platform?.rawgId,
      ordering: query.sortOrder || undefined,
    },
  };

  try {
    const response = await apiClient.get<FetchResponse<Game>>("/games", config);
    return response.data;
  } catch {
    const fallbackResponse = filterFallbackGames(query);
    const pageSize = 9;
    const start = (page - 1) * pageSize;
    const results = fallbackResponse.results.slice(start, start + pageSize);

    return {
      count: fallbackResponse.count,
      next: start + pageSize < fallbackResponse.count ? String(page + 1) : null,
      previous: page > 1 ? String(page - 1) : null,
      results,
    };
  }
}

export function getGenreName(selectedGenre: number | null) {
  return findGenreById(selectedGenre)?.name ?? "All genres";
}

export function getPlatformName(selectedPlatform: number | null) {
  return findPlatformById(selectedPlatform)?.name ?? "Any platform";
}
