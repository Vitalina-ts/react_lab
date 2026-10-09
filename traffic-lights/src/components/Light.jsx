import PropTypes from "prop-types";

const Light = ({ color, isActive, onSelect, ariaLabel }) => {
  return (
    <button
      type="button"
      className={`Light${isActive ? " Light--active" : ""}`}
      style={{ backgroundColor: color }}
      onClick={() => onSelect(color)}
      aria-label={ariaLabel}
      aria-pressed={isActive}
    />
  );
};

Light.propTypes = {
  color: PropTypes.oneOf(["red", "yellow", "green"]).isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default Light;
