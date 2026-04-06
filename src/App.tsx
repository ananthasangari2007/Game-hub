import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import type { GameQuery } from "./services/game-service";

const STORAGE_KEY = "pixelvault-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return true;
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "light") return false;
  if (storedTheme === "dark") return true;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function App() {
  const [query, setQuery] = useState<GameQuery>({
    searchText: "",
    selectedGenre: null,
    selectedPlatform: null,
    sortOrder: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    window.localStorage.setItem(STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="app-shell">
      <Navbar
        currentSearch={query.searchText}
        isDarkMode={isDarkMode}
        isSidebarOpen={isSidebarOpen}
        onSearch={(searchText) => {
          setCurrentPage(1);
          setQuery((current) => ({ ...current, searchText }));
        }}
        onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
        onToggleTheme={() => setIsDarkMode((current) => !current)}
      />
      <HomePage
        query={query}
        currentPage={currentPage}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
        onLoadMore={() => setCurrentPage((current) => current + 1)}
        onGenreSelect={(selectedGenre) => {
          setCurrentPage(1);
          setIsSidebarOpen(false);
          setQuery((current) => ({ ...current, selectedGenre }));
        }}
        onPlatformSelect={(selectedPlatform) => {
          setCurrentPage(1);
          setQuery((current) => ({ ...current, selectedPlatform }));
        }}
        onSortSelect={(sortOrder) => {
          setCurrentPage(1);
          setQuery((current) => ({ ...current, sortOrder }));
        }}
      />
    </div>
  );
}

export default App;
