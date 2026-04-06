import styles from "./GameCard.module.css";
import type { Game } from "../services/game-service";

interface Props {
  game: Game;
}

function formatReleaseDate(released: string | null) {
  if (!released) return "TBA";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(released));
}

function getPlatformAbbreviation(name: string) {
  const dictionary: Record<string, string> = {
    PC: "PC",
    PlayStation: "PS",
    Xbox: "XB",
    Nintendo: "NS",
    macOS: "MAC",
    Macintosh: "MAC",
    Linux: "LNX",
    iOS: "iOS",
    Android: "AND",
  };

  return dictionary[name] ?? name.slice(0, 2).toUpperCase();
}

function GameCard({ game }: Props) {
  const platforms = game.parent_platforms.map(({ platform }) => platform.name).slice(0, 4);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img
          src={game.background_image ?? "https://placehold.co/600x400/101828/F9FAFB?text=No+Image"}
          alt={game.name}
        />
        <div className={styles.playBadge} aria-hidden="true">
          &gt;
        </div>
        <div className={styles.rating} aria-label={`Rating ${game.rating.toFixed(1)}`}>
          {Math.round(game.metacritic ?? game.rating * 20)}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          {platforms.length > 0 ? (
            platforms.map((platform) => (
              <span key={platform} className={styles.iconChip} title={platform}>
                {getPlatformAbbreviation(platform)}
              </span>
            ))
          ) : (
            <span className={styles.iconChip}>N/A</span>
          )}
        </div>

        <h3 className={styles.title}>{game.name}</h3>

        <div className={styles.summary}>
          <span className={styles.summaryPill}>+ {game.rating_top * 3811}</span>
          <span>{formatReleaseDate(game.released)}</span>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
