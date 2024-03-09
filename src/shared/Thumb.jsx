
import PropTypes from "prop-types";
import '../styles/shared/Thumb.css';

export const Thumb = ({type}) => {
  return (
    <div className={`thumb thumb--${type}`} aria-label="thumbs-up">
      <img src={`/assets/img/thumbs-${type}.svg`} alt={type} />
    </div>
  )
}

Thumb.propTypes = {
  type: PropTypes.string.isRequired
};
