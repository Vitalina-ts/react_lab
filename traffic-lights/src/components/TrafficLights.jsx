import { useState } from "react";
import PropTypes from "prop-types";
import Light from "./Light";
import "../index.css";

const lights = [
  { color: "red", label: "Червоний", ariaLabel: "Червона лампа" },
  { color: "yellow", label: "Жовтий", ariaLabel: "Жовта лампа" },
  { color: "green", label: "Зелений", ariaLabel: "Зелена лампа" },
];

const TrafficLights = ({ orientation = "vertical" }) => {
  const [clicks, setClicks] = useState({
    red: 0,
    yellow: 0,
    green: 0,
  });
  const isVertical = orientation === "vertical";

  function handleLightClick(color) {
    setClicks((previousClicks) => ({
      ...previousClicks,
      [color]: previousClicks[color] + 1,
    }));
  }

  return (
    <div className="traffic-demo">
      <div
        className="TrafficLights"
        style={{ flexDirection: isVertical ? "column" : "row" }}
      >
        {lights.map(({ color, ariaLabel }) => (
          <Light
            key={color}
            tlColor={color}
            ariaLabel={ariaLabel}
            onClick={() => handleLightClick(color)}
          />
        ))}
      </div>
      <dl className="traffic-stats" aria-live="polite" aria-atomic="true">
        {lights.map(({ color, label }) => (
          <div className="stat" key={color}>
            <dt>{label}</dt>
            <dd>{clicks[color]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

TrafficLights.propTypes = {
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default TrafficLights;
