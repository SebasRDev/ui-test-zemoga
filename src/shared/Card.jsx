import PropTypes from "prop-types";
import "../styles/shared/Card.css";
import { GaugeBar } from "./GaugeBar";
import { Thumb } from "./Thumb";

export const Card = ({ celebrity }) => {
  const { name, description, category, picture, lastUpdated, votes } = celebrity;

  const calculateDiferenceDates = (dateString) => {
    const currentDate = new Date();
    const votingDate = new Date(dateString);
    const difference = currentDate - votingDate;
    const diffInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
      return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }
    if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="voting-card">
      <img
        className="voting-card__portrait"
        src={`./assets/img/${picture}`}
        alt="Kanye West"
      />
      <div className="voting-card__content">
        <div className="voting-card__data">
          <div className="voting-card__thumb-average">
            <Thumb type={votes.positive > votes.negative ? 'up' : 'down'} />
          </div>
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
        <div className="votin-card__votes">
          <p>
            {calculateDiferenceDates(lastUpdated)} in <span>{category}</span>
          </p>
          <Thumb type="up" />
          <Thumb type="down" />
          <button>Vote now</button>
        </div>
        <GaugeBar votes={votes}/>
      </div>
    </div>
  );
};

Card.propTypes = {
  celebrity: PropTypes.object.isRequired,
};
