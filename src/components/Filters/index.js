import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Filters = props => {
  const { onGenderChange, genders, allCities, onCityChange, cities } = props;
  return (
    <form>
      <fieldset>
        <legend>Gender</legend>
        <input
          type="checkbox"
          name="genders"
          id="female"
          value="female"
          onChange={onGenderChange}
          checked={genders.includes('female')}
        />
        <label htmlFor="female">Female</label>

        <input
          type="checkbox"
          name="genders"
          id="male"
          value="male"
          onChange={onGenderChange}
          checked={genders.includes('male')}
        />
        <label htmlFor="male">Male</label>
      </fieldset>

      <fieldset>
        <legend>Cities</legend>
        {allCities.map(item => {
          return (
            <Fragment key={item}>
              <input
                type="checkbox"
                name="cities"
                id={item}
                value={item}
                onChange={onCityChange}
                checked={cities.includes(item)}
              />
              <label htmlFor={item}>{item}</label>
            </Fragment>
          );
        })}
      </fieldset>
    </form>
  );
};

Filters.propTypes = {
  onGenderChange: PropTypes.func.isRequired,
  genders: PropTypes.arrayOf(PropTypes.string).isRequired,
  allCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityChange: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default Filters;
