function Skeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__media" />
      <div className="skeleton-card__body">
        <div className="skeleton-card__line" />
        <div className="skeleton-card__line skeleton-card__line--medium" />
        <div className="skeleton-card__chips">
          <div className="skeleton-card__chip" />
          <div className="skeleton-card__chip" />
        </div>
        <div className="skeleton-card__line skeleton-card__line--short" />
      </div>
    </div>
  );
}

export default Skeleton;
