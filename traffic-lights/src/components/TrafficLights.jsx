import PropTypes from "prop-types";
import Light from "./Light";
import "../index.css";
const TrafficLights = ({ orientation = "vertical" }) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      className="TrafficLights"
      style={{ flexDirection: isVertical ? "column" : "row" }}
    >
      <Light tlColor="#ff0000" />
      <Light />
      <Light tlColor="green" />
    </div>
  );
};

TrafficLights.propTypes = {
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default TrafficLights;
