import { useState } from "react";
import Light from "./Light.jsx";
import StatsBar from "./StatsBar.jsx";

const lights = [
  { color: "red", ariaLabel: "Червона лампа" },
  { color: "yellow", ariaLabel: "Жовта лампа" },
  { color: "green", ariaLabel: "Зелена лампа" },
];

const TrafficLights = () => {
  const [currentSignal, setCurrentSignal] = useState("red");
  const [clicks, setClicks] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState("vertical");
  const totalClicks = clicks.red + clicks.yellow + clicks.green;

  function handleLightSelect(color) {
    setCurrentSignal(color);
    setClicks((previousClicks) => ({
      ...previousClicks,
      [color]: previousClicks[color] + 1,
    }));
  }

  function handleOrientationToggle() {
    setOrientation((previousOrientation) =>
      previousOrientation === "vertical" ? "horizontal" : "vertical",
    );
  }

  return (
    <div className="traffic-demo">
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
            onSelect={handleLightSelect}
          />
        ))}
      </div>
      <StatsBar
        clicks={clicks}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        onToggleOrientation={handleOrientationToggle}
      />
    </div>
  );
};

export default TrafficLights;
