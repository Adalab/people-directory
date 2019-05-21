import React from 'react';
import PropTypes from 'prop-types';

const Card = props => {
  const { name, img, city, age } = props;
  return (
    <article>
      <h2>{name}</h2>
      <img src={img} alt={name} />
      <p>{city}</p>
      <p>{age}</p>
    </article>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};

export default Card;
