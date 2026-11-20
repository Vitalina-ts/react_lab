import PropTypes from "prop-types";

const signalLabels = {
  red: "Червоний",
  yellow: "Жовтий",
  green: "Зелений",
};

function StatsBar({
  clicks,
  totalClicks,
  currentSignal,
  orientation,
  isAutomatic,
}) {
  return (
    <div className="stats-bar">
      <dl className="traffic-stats" aria-live="polite" aria-atomic="true">
        {Object.entries(signalLabels).map(([color, label]) => (
          <div className="stat" key={color}>
            <dt>{label}</dt>
            <dd>{clicks[color]}</dd>
          </div>
        ))}
        <div className="stat">
          <dt>Усього</dt>
          <dd>{totalClicks}</dd>
        </div>
        <div className="stat stat--signal">
          <dt>Активний сигнал</dt>
          <dd>{signalLabels[currentSignal]}</dd>
        </div>
      </dl>
      <p className="orientation-label">
        Орієнтація:{" "}
        {orientation === "vertical" ? "вертикальна" : "горизонтальна"}
      </p>
      <p>Режим: {isAutomatic ? "автоматичний" : "ручний"}</p>
    </div>
  );
}

StatsBar.propTypes = {
  clicks: PropTypes.shape({
    red: PropTypes.number.isRequired,
    yellow: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
  }).isRequired,
  totalClicks: PropTypes.number.isRequired,
  currentSignal: PropTypes.oneOf(["red", "yellow", "green"]).isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]).isRequired,
  isAutomatic: PropTypes.bool.isRequired,
};

export default StatsBar;
