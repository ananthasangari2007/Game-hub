import { SORT_OPTIONS } from "../services/game-service";

interface Props {
  sortOrder: string;
  onSelectSortOrder: (value: string) => void;
}

function SortSelector({ sortOrder, onSelectSortOrder }: Props) {
  return (
    <div className="select-group">
      <label htmlFor="sort-select">Sort by</label>
      <select
        id="sort-select"
        className="select"
        value={sortOrder}
        onChange={(event) => onSelectSortOrder(event.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelector;
