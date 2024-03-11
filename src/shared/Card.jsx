import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/shared/Card.css";
import { GaugeBar } from "./GaugeBar";
import { Thumb } from "./Thumb";
import { calculateDiferenceDates } from "../helpers/utils";

export const Card = ({ celebrity, handleUpdate }) => {
  const [thumbSelected, setThumbSelected] = useState({
    like: false,
    dislike: false,
  });
  const [voted, setVoted] = useState(false);

  const { name, description, category, picture, lastUpdated, votes } = celebrity;

  const handleSelectVote = (type) => {
    if (type === "up") {
      setThumbSelected({ like: true, dislike: false });
    } else {
      setThumbSelected({ like: false, dislike: true });
    }
  };

  const handleVote = () => {
    if (!voted && (thumbSelected.like || thumbSelected.dislike)){
      setVoted(true);
      const updatedCelebrity = {
        ...celebrity,
        votes: {
          positive: thumbSelected.like ? votes.positive + 1 : votes.positive,
          negative: thumbSelected.dislike ? votes.negative + 1 : votes.negative,
        },
      };
      handleUpdate(updatedCelebrity);
    }
    if (voted) {
      setVoted(false);
      setThumbSelected({ like: false, dislike: false });
    }
  }

  return (
    <div className="voting-card" role="listitem" aria-label={`Voting card ${name}`}>
      <img
        className="voting-card__portrait"
        src={`./assets/img/${picture}`}
        alt={name}
      />
      <div className="voting-card__content">
        <div className="voting-card__data">
          <div className="voting-card__thumb-average" aria-label="Average votes">
            <Thumb type={votes.positive > votes.negative ? "up" : "down"} />
          </div>
          <h4 aria-label="name">{name}</h4>
          <p aria-label="description">{description}</p>
        </div>
        <div className="votin-card__votes">
          {voted ? (
            <p aria-label="Thanks for voting label">Thank you for voting!</p>
          ) : (
            <p aria-label="How many time ago label">
              {calculateDiferenceDates(lastUpdated)} in <span>{category}</span>
            </p>
          )}
          {!voted && (
            <>
              <Thumb
                type="up"
                isSelected={thumbSelected.like}
                handleSelect={handleSelectVote}
                testId={"thumb-up-action"}
              />
              <Thumb
                type="down"
                isSelected={thumbSelected.dislike}
                handleSelect={handleSelectVote}
                testId={"thumb-down-action"}
              />
            </>
          )}
          <button role="button" disabled={!thumbSelected.like && !thumbSelected.dislike} onClick={handleVote} aria-label={`Vote for ${name}`}>
            {voted ? "Vote Again" : "Vote Now"}
          </button>
        </div>
        <GaugeBar votes={votes} />
      </div>
    </div>
  );
};

Card.propTypes = {
  celebrity: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func,
};
