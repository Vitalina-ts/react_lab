import "./App.css";
import TrafficLights from "./components/TrafficLights.jsx";

function App() {
  return (
    <main className="page">
      <section className="traffic-card" aria-labelledby="traffic-heading">
        <h2 id="traffic-heading">Інтерактивний світлофор</h2>
        <TrafficLights />
      </section>
    </main>
  );
}

export default App;
