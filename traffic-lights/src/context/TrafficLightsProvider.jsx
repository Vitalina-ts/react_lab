import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { TrafficLightsContext } from "./TrafficLightsContext.js";
import {
  listTrafficLights,
  updateTrafficLightState,
} from "../api/trafficLightsApi.js";

const cycle = ["red", "yellow", "green", "yellow"];
const phaseBySignal = { red: 0, yellow: 1, green: 2 };

function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [clicks, setClicks] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState("vertical");
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [serverTrafficLights, setServerTrafficLights] = useState([]);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [loadError, setLoadError] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [saveError, setSaveError] = useState("");
  const saveInProgress = useRef(false);

  const currentSignal = cycle[phaseIndex];
  const totalClicks = clicks.red + clicks.yellow + clicks.green;

  const loadTrafficLights = useCallback(async () => {
    try {
      const trafficLights = await listTrafficLights();
      const mainTrafficLight = trafficLights.find(({ id }) => id === "main");

      if (!mainTrafficLight) {
        throw new Error('The server response does not contain a "main" traffic light.');
      }

      const loadedPhase = phaseBySignal[mainTrafficLight.currentSignal];
      if (loadedPhase === undefined) {
        throw new Error("The server returned an unsupported traffic-light signal.");
      }

      setServerTrafficLights(trafficLights);
      setPhaseIndex(loadedPhase);
      setLoadStatus("success");
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Unknown loading error.",
      );
      setLoadStatus("error");
    }
  }, []);

  const reloadTrafficLights = useCallback(async () => {
    setLoadStatus("loading");
    setLoadError("");
    await loadTrafficLights();
  }, [loadTrafficLights]);

  const saveCurrentSignal = useCallback(async () => {
    if (saveInProgress.current || loadStatus !== "success") return;

    saveInProgress.current = true;
    setSaveStatus("loading");
    setSaveError("");

    try {
      const savedTrafficLight = await updateTrafficLightState(
        "main",
        currentSignal,
      );

      if (
        savedTrafficLight.id !== "main" ||
        phaseBySignal[savedTrafficLight.currentSignal] === undefined
      ) {
        throw new Error("The server returned an invalid saved traffic light.");
      }

      setServerTrafficLights((previousTrafficLights) =>
        previousTrafficLights.map((trafficLight) =>
          trafficLight.id === savedTrafficLight.id
            ? savedTrafficLight
            : trafficLight,
        ),
      );
      setSaveStatus("success");
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Unknown saving error.",
      );
      setSaveStatus("error");
    } finally {
      saveInProgress.current = false;
    }
  }, [currentSignal, loadStatus]);

  useEffect(() => {
    void Promise.resolve().then(loadTrafficLights);
  }, [loadTrafficLights]);

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
      serverTrafficLights, loadStatus, loadError, reloadTrafficLights,
      saveStatus, saveError, saveCurrentSignal,
    }}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

TrafficLightsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrafficLightsProvider;
