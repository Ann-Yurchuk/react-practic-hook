import React from 'react';
import PropTypes from 'prop-types';

export const Dog = ({ dog: { breeds, url } }) => {
  const { bred_for, name, temperament } = breeds[0];
  return (
    <div style={{ display: 'flex' }}>
      <img src={url} alt={name} width="320" />
      <div>
        <p>Name:{name}</p>
        <p>Bred_for: {bred_for}</p>
        <p>Temperament: {temperament}</p>
      </div>
    </div>
  );
};

Dog.propTypes = {
  breeds: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      bred_for: PropTypes.string.isRequired,
      temperament: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};
