import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TrafficLightsContext } from "./TrafficLightsContext.js";

const cycle = ["red", "yellow", "green", "yellow"];

function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [clicks, setClicks] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState("vertical");
  const [isAutomatic, setIsAutomatic] = useState(false);

  const currentSignal = cycle[phaseIndex];
  const totalClicks = clicks.red + clicks.yellow + clicks.green;

  useEffect(() => {
    if (!isAutomatic) return;

    const intervalId = setInterval(() => {
      setPhaseIndex((previousPhase) => (previousPhase + 1) % cycle.length);
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

  function startAutomatic() {
    setIsAutomatic(true);
  }

  function stopAutomatic() {
    setIsAutomatic(false);
  }

  return (
    <TrafficLightsContext.Provider value={{
      phaseIndex, clicks, orientation, isAutomatic, currentSignal, totalClicks,
      handleLightSelect, handleOrientationToggle, startAutomatic, stopAutomatic,
    }}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

TrafficLightsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrafficLightsProvider;
