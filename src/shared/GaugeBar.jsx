import PropTypes from "prop-types";
import '../styles/shared/GaugeBar.css';

export const GaugeBar = ({votes}) => {
  const { positive, negative } = votes;
  const calculatePercentage = () => {
    const total = positive + negative;
    return {
      positive: `${(positive / total * 100).toFixed(1)}%`,
      negative: `${(negative / total * 100).toFixed(1)}%`,
    }
  }

  return (
    <div className="gauge-bar">
       <div style={{flex: `1 0 ${calculatePercentage().positive}`}} className='gauge-bar__data gauge-bar__data--likes'>
          <div className='gauge-bar__data__content'>
            <img src="./assets/img/thumbs-up.svg" alt="thumbs-up" />
            <p>{calculatePercentage().positive}</p>
          </div>
       </div>
       <div style={{flex: `1 0 ${calculatePercentage().negative}`}} className='gauge-bar__data gauge-bar__data--dislikes'>
          <div className='gauge-bar__data__content'>
            <p>{calculatePercentage().negative}</p>
            <img src="./assets/img/thumbs-down.svg" alt="thumbs-down" />
          </div>
       </div>
    </div>
  )
}

GaugeBar.propTypes = {
  votes: PropTypes.object.isRequired,
};