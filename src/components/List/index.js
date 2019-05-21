import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

import './styles.scss';

const List = props => {
  return <ul className="List">
    {props.people.map(item => {
      return <li key={item.login.uuid}>
        <Card
          name={`${item.name.first} ${item.name.last}`}
          img={item.picture.thumbnail}
          city={item.location.city}
          age={item.dob.age}
        />
      </li>
    })}
  </ul>;
};

List.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default List;
