import type { Genre } from "../services/game-service";

interface Props {
  genres: Genre[];
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

const genreAccents: Record<string, string> = {
  action: "genre-thumb--action",
  indie: "genre-thumb--indie",
  adventure: "genre-thumb--adventure",
  "role-playing-games-rpg": "genre-thumb--rpg",
  strategy: "genre-thumb--strategy",
  shooter: "genre-thumb--shooter",
  casual: "genre-thumb--casual",
  simulation: "genre-thumb--simulation",
  puzzle: "genre-thumb--puzzle",
  arcade: "genre-thumb--arcade",
  platformer: "genre-thumb--platformer",
  racing: "genre-thumb--racing",
  "massively-multiplayer": "genre-thumb--mmo",
  sports: "genre-thumb--sports",
  fighting: "genre-thumb--fighting",
};

const genreImages: Record<string, string> = {
  action:
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=240&q=80",
  indie:
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=240&q=80",
  adventure:
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=240&q=80",
  "role-playing-games-rpg":
    "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=240&q=80",
  strategy:
    "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=240&q=80",
  shooter:
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=240&q=80",
  casual:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=240&q=80",
  simulation:
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=240&q=80",
  puzzle:
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=240&q=80",
  arcade:
    "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=240&q=80",
  platformer:
    "https://images.unsplash.com/photo-1514329926535-7f6db2f4b3ef?auto=format&fit=crop&w=240&q=80",
  racing:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=240&q=80",
  "massively-multiplayer":
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=240&q=80",
  sports:
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=240&q=80",
  fighting:
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=240&q=80",
};

function GenreList({ genres, selectedGenre, onSelectGenre }: Props) {
  return (
    <div className="genre-list">
      <button
        type="button"
        className={`genre-list__button ${selectedGenre === null ? "genre-list__button--active" : ""}`}
        onClick={() => onSelectGenre(null)}
      >
        <span className="genre-list__content">
          <span className="genre-thumb genre-thumb--all">ALL</span>
          <span>All genres</span>
        </span>
        <span className="genre-list__meta">{selectedGenre === null ? "Active" : ""}</span>
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          className={`genre-list__button ${
            selectedGenre === genre.id ? "genre-list__button--active" : ""
          }`}
          onClick={() => onSelectGenre(genre.id)}
        >
          <span className="genre-list__content">
            <span className={`genre-thumb ${genreAccents[genre.slug] ?? "genre-thumb--all"}`}>
              <img src={genreImages[genre.slug]} alt="" loading="lazy" />
            </span>
            <span>{genre.name}</span>
          </span>
          <span className="genre-list__meta">{selectedGenre === genre.id ? "Active" : ""}</span>
        </button>
      ))}
    </div>
  );
}

export default GenreList;
