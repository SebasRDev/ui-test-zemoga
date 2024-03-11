import PropTypes from "prop-types";
import '../styles/shared/GaugeBar.css';
import { calculatePercentage } from "../helpers/utils";

export const GaugeBar = ({votes}) => {
  const { positive, negative } = calculatePercentage(votes.positive, votes.negative);

  return (
    <div className="gauge-bar" role="progressbar" aria-label="Voting gauge">
       <div style={{flex: `1 0 ${positive}`}} className='gauge-bar__data gauge-bar__data--likes'>
          <div className='gauge-bar__data__content'>
            <img src="./assets/img/thumbs-up.svg" alt="thumbs-up" aria-hidden="true"/>
            <p aria-label="Positive percentage">{positive}</p>
          </div>
       </div>
       <div style={{flex: `1 0 ${negative}`}} className='gauge-bar__data gauge-bar__data--dislikes'>
          <div className='gauge-bar__data__content'>
            <p aria-label="Negative percentage">{negative}</p>
            <img src="./assets/img/thumbs-down.svg" alt="thumbs-down" aria-hidden="true"/>
          </div>
       </div>
    </div>
  )
}

GaugeBar.propTypes = {
  votes: PropTypes.object.isRequired,
};