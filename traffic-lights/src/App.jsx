import "./App.css";
import TrafficLights from "./components/TrafficLights";

function App() {
  return (
    <main className="page">
      <section className="traffic-card" aria-labelledby="vertical-heading">
        <h2 id="vertical-heading">Вертикальний світлофор</h2>
        <TrafficLights orientation="vertical" />
      </section>
      <section className="traffic-card" aria-labelledby="horizontal-heading">
        <h2 id="horizontal-heading">Горизонтальний світлофор</h2>
        <TrafficLights orientation="horizontal" />
      </section>
    </main>
  );
}

export default App;
