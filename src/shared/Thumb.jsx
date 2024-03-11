import PropTypes from "prop-types";
import '../styles/shared/Thumb.css';

export const Thumb = ({type, isSelected, handleSelect, testId}) => {
  const handleClick = () => {
    if (!handleSelect) {
      return;
    }
    handleSelect(type);
  };

  return (
    <div data-testid={testId || ''} onClick={handleClick} className={`thumb thumb--${type} ${isSelected ? 'thumb--active' : ''}`} aria-label={`thumbs-${type}`} role="button">
      <img src={`/assets/img/thumbs-${type}.svg`} alt={type} />
    </div>
  )
}

Thumb.propTypes = {
  type: PropTypes.string.isRequired,
  handleSelect: PropTypes.func,
  isSelected: PropTypes.bool,
  testId: PropTypes.string
};
