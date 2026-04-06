import type { PlatformOption } from "../services/game-service";

interface Props {
  platforms: PlatformOption[];
  selectedPlatform: number | null;
  onSelectPlatform: (platformId: number | null) => void;
}

function PlatformSelector({ platforms, selectedPlatform, onSelectPlatform }: Props) {
  return (
    <div className="select-group">
      <label htmlFor="platform-select">Platform</label>
      <select
        id="platform-select"
        className="select"
        value={selectedPlatform ?? ""}
        onChange={(event) =>
          onSelectPlatform(event.target.value ? Number(event.target.value) : null)
        }
      >
        <option value="">All platforms</option>
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlatformSelector;
