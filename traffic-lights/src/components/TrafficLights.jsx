import PropTypes from "prop-types";
import Light from "./Light.jsx";

const lights = [
  { color: "red", ariaLabel: "Червона лампа" },
  { color: "yellow", ariaLabel: "Жовта лампа" },
  { color: "green", ariaLabel: "Зелена лампа" },
];

const TrafficLights = ({
  currentSignal,
  orientation,
  isAutomatic,
  onSelect,
}) => {
  return (
    <div
      className="TrafficLights"
      role="group"
      aria-label="Вибір сигналу світлофора"
      style={{ flexDirection: orientation === "vertical" ? "column" : "row" }}
    >
      {lights.map(({ color, ariaLabel }) => (
        <Light
          key={color}
          color={color}
          isActive={currentSignal === color}
          ariaLabel={ariaLabel}
          onSelect={onSelect}
          disabled={isAutomatic}
        />
      ))}
    </div>
  );
};

TrafficLights.propTypes = {
  currentSignal: PropTypes.oneOf(["red", "yellow", "green"]).isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]).isRequired,
  isAutomatic: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TrafficLights;
