import { useContext } from "react";
import { TrafficLightsContext } from "../context/TrafficLightsContext.js";
import TrafficLights from "../components/TrafficLights.jsx";

function TrafficLightPage() {
  const {
    currentSignal, orientation, isAutomatic,
    handleLightSelect, handleOrientationToggle, startAutomatic, stopAutomatic,
    serverTrafficLights, loadStatus, loadError, reloadTrafficLights,
    saveStatus, saveError, saveCurrentSignal,
  } = useContext(TrafficLightsContext);
  const savedSignal = serverTrafficLights.find(({ id }) => id === "main")
    ?.currentSignal;

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
        {loadStatus === "loading" && (
          <p role="status">Завантаження даних світлофора…</p>
        )}
        {loadStatus === "error" && (
          <div role="alert">
            <p>
              Не вдалося завантажити збережений серверний стан. {loadError}
            </p>
            <button
              type="button"
              className="orientation-button"
              onClick={reloadTrafficLights}
            >
              Повторити
            </button>
          </div>
        )}
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
        <button type="button" className="orientation-button" onClick={handleOrientationToggle}>
          {orientation === "vertical"
            ? "Розташувати горизонтально"
            : "Розташувати вертикально"}
        </button>
        <div className="server-controls">
          <button
            type="button"
            className="orientation-button"
            onClick={saveCurrentSignal}
            disabled={loadStatus !== "success" || saveStatus === "loading"}
          >
            {saveStatus === "loading"
              ? "Збереження…"
              : "Зберегти поточний сигнал"}
          </button>
          {saveStatus === "success" && (
            <p role="status">
              На сервері збережено сигнал: {savedSignal}.
            </p>
          )}
          {saveStatus === "error" && (
            <p role="alert">
              Не вдалося підтвердити збереження на сервері. {saveError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default TrafficLightPage;
