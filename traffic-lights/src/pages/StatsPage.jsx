import { useContext } from "react";
import { TrafficLightsContext } from "../context/TrafficLightsContext.js";
import StatsBar from "../components/StatsBar.jsx";

function StatsPage() {
  const { clicks, totalClicks, currentSignal, orientation, isAutomatic } =
    useContext(TrafficLightsContext);

  return (
    <section className="traffic-card" aria-labelledby="stats-heading">
      <h1 id="stats-heading">Статистика світлофора</h1>
      <StatsBar clicks={clicks} totalClicks={totalClicks}
        currentSignal={currentSignal} orientation={orientation}
        isAutomatic={isAutomatic} />
    </section>
  );
}

export default StatsPage;
