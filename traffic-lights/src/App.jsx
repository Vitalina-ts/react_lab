import { Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./components/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import TrafficLightPage from "./pages/TrafficLightPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/traffic-light" element={<TrafficLightPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
