import GameGrid from "../components/GameGrid";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";
import useGames from "../hooks/useGames";
import useGenres from "../hooks/useGenres";
import usePlatforms from "../hooks/usePlatforms";
import {
  getGenreName,
  getPlatformName,
  type GameQuery,
} from "../services/game-service";

interface Props {
  query: GameQuery;
  currentPage: number;
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
  onLoadMore: () => void;
  onGenreSelect: (genreId: number | null) => void;
  onPlatformSelect: (platformId: number | null) => void;
  onSortSelect: (sortOrder: string) => void;
}

function HomePage({
  query,
  currentPage,
  isSidebarOpen,
  onCloseSidebar,
  onLoadMore,
  onGenreSelect,
  onPlatformSelect,
  onSortSelect,
}: Props) {
  const { data: genres } = useGenres();
  const { data: platforms } = usePlatforms();
  const { data: games, loading, loadingMore, error, count, hasNextPage } = useGames(
    query,
    currentPage,
  );
  const quickLinks = [
    { icon: "HM", label: "Home" },
    { icon: "RV", label: "Reviews" },
    { icon: "NR", label: "New Releases" },
    { icon: "TP", label: "Top 250" },
  ];
  const releaseLinks = ["Last 30 days", "This week", "Next week", "Release calendar"];

  return (
    <main className="page">
      <div className="container">
        <div className={`layout ${isSidebarOpen ? "layout--sidebar-open" : "layout--sidebar-closed"}`}>
          {isSidebarOpen ? <button type="button" className="sidebar-backdrop" onClick={onCloseSidebar} aria-label="Close sidebar" /> : null}

          <aside className={`sidebar ${isSidebarOpen ? "sidebar--open" : ""}`}>
            <section className="sidebar__section sidebar__section--nav">
              {quickLinks.map((link) => (
                <button key={link.label} type="button" className="sidebar-link">
                  <span className="sidebar-link__icon">{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </section>

            <section className="sidebar__section">
              <h2>New Releases</h2>
              <div className="sidebar-stack">
                {releaseLinks.map((label) => (
                  <button key={label} type="button" className="sidebar-link sidebar-link--subtle">
                    <span className="sidebar-link__icon">RL</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="sidebar__section">
              <h2>Genres</h2>
              <GenreList
                genres={genres}
                selectedGenre={query.selectedGenre}
                onSelectGenre={onGenreSelect}
              />
            </section>
          </aside>

          <section className="content-panel content-panel--full">
            <div className="toolbar">
              <div className="toolbar__meta">
                <h2>{query.selectedGenre ? getGenreName(query.selectedGenre) : "Games"}</h2>
                <p>
                  {getPlatformName(query.selectedPlatform)} | {count} results | RAWG API
                  with built-in showcase fallback
                </p>
              </div>

              <div className="toolbar__filters">
                <PlatformSelector
                  platforms={platforms}
                  selectedPlatform={query.selectedPlatform}
                  onSelectPlatform={onPlatformSelect}
                />
                <SortSelector sortOrder={query.sortOrder} onSelectSortOrder={onSortSelect} />
                <div className="view-switch" aria-hidden="true">
                  <span className="view-switch__grid" />
                  <span className="view-switch__grid view-switch__grid--stack" />
                </div>
              </div>
            </div>

            <div className="content__body">
              {error ? <div className="status status--error">{error}</div> : null}
              {!error ? (
                <div className="status">
                  Search, genre filters, platform filters, sorting, dark mode, and loading
                  skeletons are all wired through one centralized state object. If you do not
                  add a RAWG API key yet, the app now shows built-in demo games instead of an
                  error.
                </div>
              ) : null}
              <GameGrid
                games={games}
                loading={loading}
                loadingMore={loadingMore}
                hasNextPage={hasNextPage}
                currentPage={currentPage}
                totalCount={count}
                onLoadMore={onLoadMore}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
