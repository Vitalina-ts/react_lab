import { useEffect, useState } from "react";
import Light from "./Light.jsx";
import StatsBar from "./StatsBar.jsx";

const lights = [
  { color: "red", ariaLabel: "Червона лампа" },
  { color: "yellow", ariaLabel: "Жовта лампа" },
  { color: "green", ariaLabel: "Зелена лампа" },
];

const cycle = ["red", "yellow", "green", "yellow"];

const TrafficLights = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const currentSignal = cycle[phaseIndex];
  const [clicks, setClicks] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState("vertical");
  const totalClicks = clicks.red + clicks.yellow + clicks.green;

  useEffect(() => {
    if (!isAutomatic) return;

    const intervalId = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % cycle.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [isAutomatic]);

  function handleLightSelect(color) {
    if (isAutomatic) return;

    setPhaseIndex(cycle.indexOf(color));
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
            disabled={isAutomatic}
          />
        ))}
      </div>
      <div className="automatic-controls">
        <button
          type="button"
          className="orientation-button"
          onClick={() => setIsAutomatic(true)}
          disabled={isAutomatic}
        >
          Запустити
        </button>
        <button
          type="button"
          className="orientation-button"
          onClick={() => setIsAutomatic(false)}
          disabled={!isAutomatic}
        >
          Зупинити
        </button>
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
