import GameCard from "./GameCard";
import Skeleton from "./Skeleton";
import type { Game } from "../services/game-service";

interface Props {
  games: Game[];
  loading: boolean;
  loadingMore: boolean;
  hasNextPage: boolean;
  currentPage: number;
  totalCount: number;
  onLoadMore: () => void;
}

function GameGrid({
  games,
  loading,
  loadingMore,
  hasNextPage,
  currentPage,
  totalCount,
  onLoadMore,
}: Props) {
  if (loading) {
    return (
      <div className="game-grid" aria-label="Loading games">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="status status--empty">
        <div>
          <h3 className="status__title">No games matched this search</h3>
          <p className="status__text">
            Try a broader title, a different genre, or reset one of the filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="game-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <div className="pagination-bar">
        <div className="pagination-bar__summary">
          <strong>{games.length}</strong>
          <span>of {totalCount} games shown</span>
          <span>Page {currentPage}</span>
        </div>

        {hasNextPage ? (
          <button
            type="button"
            className="load-more-button"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        ) : (
          <div className="pagination-bar__end">You reached the end of the list.</div>
        )}
      </div>
    </>
  );
}

export default GameGrid;
