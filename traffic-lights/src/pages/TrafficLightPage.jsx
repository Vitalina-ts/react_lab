import { useContext } from "react";
import { TrafficLightsContext } from "../context/TrafficLightsContext.js";
import TrafficLights from "../components/TrafficLights.jsx";
import StatsBar from "../components/StatsBar.jsx";

function TrafficLightPage() {
  const {
    clicks, totalClicks, currentSignal, orientation, isAutomatic,
    handleLightSelect, handleOrientationToggle, startAutomatic, stopAutomatic,
  } = useContext(TrafficLightsContext);

  return (
    <section className="traffic-card" aria-labelledby="traffic-heading">
      <h1 id="traffic-heading">Інтерактивний світлофор</h1>
      <div className="traffic-demo">
        <TrafficLights
          currentSignal={currentSignal}
          orientation={orientation}
          isAutomatic={isAutomatic}
          onSelect={handleLightSelect}
        />
        <div className="automatic-controls">
          <button type="button" className="orientation-button"
            onClick={startAutomatic} disabled={isAutomatic}>
            Запустити
          </button>
          <button type="button" className="orientation-button"
            onClick={stopAutomatic} disabled={!isAutomatic}>
            Зупинити
          </button>
        </div>
        <StatsBar clicks={clicks} totalClicks={totalClicks}
          currentSignal={currentSignal} orientation={orientation}
          isAutomatic={isAutomatic} />
        <button type="button" className="orientation-button" onClick={handleOrientationToggle}>
          {orientation === "vertical"
            ? "Розташувати горизонтально"
            : "Розташувати вертикально"}
        </button>
      </div>
    </section>
  );
}

export default TrafficLightPage;
