import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

import './styles.scss';

const List = props => {
  return (
    <ul className="List">
      {props.people.map(item => {
        const { login, name, picture, location, dob } = item;
        return (
          <li key={login.uuid}>
            <Card
              name={`${name.first} ${name.last}`}
              img={picture.thumbnail}
              city={location.city}
              age={dob.age}
            />
          </li>
        );
      })}
    </ul>
  );
};

List.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default List;
