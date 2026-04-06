import SearchInput from "./SearchInput";

interface Props {
  currentSearch: string;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  onSearch: (value: string) => void;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
}

function Navbar({
  currentSearch,
  isDarkMode,
  isSidebarOpen,
  onSearch,
  onToggleSidebar,
  onToggleTheme,
}: Props) {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <div className="navbar__left">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={onToggleSidebar}
            aria-expanded={isSidebarOpen}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <span className="sidebar-toggle__line" />
            <span className="sidebar-toggle__line" />
            <span className="sidebar-toggle__line" />
          </button>

          <div className="brand" aria-label="Pixel Vault home">
            <div className="brand__mark" aria-hidden="true">
              <span className="brand__orb" />
              <span className="brand__orb brand__orb--small" />
              <span className="brand__core" />
            </div>
            <div>
              <span className="brand__title">GameHub</span>
            </div>
          </div>
        </div>

        <SearchInput value={currentSearch} onSearch={onSearch} />

        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-pressed={isDarkMode}>
          <span className={`theme-toggle__track ${isDarkMode ? "theme-toggle__track--active" : ""}`}>
            <span className="theme-toggle__thumb" />
          </span>
          <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
