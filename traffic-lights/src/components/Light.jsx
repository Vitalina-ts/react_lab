import PropTypes from "prop-types";
import "../index.css";

const Light = ({ tlColor = "red", onClick, ariaLabel = "Лампа світлофора" }) => {
  return (
    <button
      type="button"
      className="Light"
      style={{ backgroundColor: tlColor }}
      onClick={onClick}
      aria-label={ariaLabel}
    />
  );
};

Light.propTypes = {
  tlColor: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};

export default Light;
