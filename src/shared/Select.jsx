import PropTypes from "prop-types";
import "../styles/shared/Select.css";
import { useState } from "react";

export const Select = ({options, selected, onChange}) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value) => {
    onChange(value);
    setIsOpen(false);
  }

  return (
    <div className="select">
      <div className="select__item" onClick={() => setIsOpen(!isOpen)}>
        <p>{selected}</p>
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.25 7L6.11959e-07 -9.17939e-07L10.5 0L5.25 7Z"
            fill="#333333"
          />
        </svg>
      </div>
      <div className={`select__options ${isOpen &&'select__options--open'}`}>
        {options.map(({value, label}) => {
          return (
            <div className="select__item" key={value} onClick={() => handleChange(value)}>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Select.propTypes = {
  selected: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
