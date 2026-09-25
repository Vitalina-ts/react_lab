import "./App.css";
import TrafficLights from "./components/TrafficLights";

function App() {
  return (
    <main className="page">
      <div className="traffic-card">
        <h2>Vertical Traffic Light</h2>
        <TrafficLights orientation="vertical" />
      </div>

      <div className="traffic-card">
        <h2>Horizontal Traffic Light</h2>
        <TrafficLights orientation="horizontal" />
      </div>
    </main>
  );
}

export default App;
