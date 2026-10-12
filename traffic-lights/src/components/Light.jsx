import PropTypes from "prop-types";
import "../index.css";

const Light = ({ tlColor = "red" }) => {
  return (
    <div
      className="Light"
      style={{
        backgroundColor: tlColor,
      }}
    ></div>
  );
};

Light.propTypes = {
  tlColor: PropTypes.string,
};

export default Light;
