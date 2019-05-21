import React, { Fragment, Component } from 'react';

import fetchPeople from '../../services/people-service';

import Filters from '../Filters';
import List from '../List';

import './styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: {
        data: [],
        isFetching: true
      },
      filters: {
        genders: [],
        cities: [],
        allCities: []
      }
    };
    this.handleGenderFilter = this.handleGenderFilter.bind(this);
    this.handleCityFilter = this.handleCityFilter.bind(this);
  }

  componentDidMount() {
    this.getPeople();
  }

  getPeople() {
    fetchPeople().then(data => {
      this.setState(prevState => {
        return {
          people: {
            data: data.results,
            isFetching: false
          },
          filters: {
            ...prevState.filters,
            allCities: data.results
              .map(item => item.location.city)
              .filter((item, ind, arr) => arr.indexOf(item) === ind)
          }
        };
      });
    });
  }

  handleGenderFilter(e) {
    const { value, checked } = e.target;

    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          genders: checked
            ? prevState.filters.genders.concat(value)
            : prevState.filters.genders.filter(item => item !== value)
        }
      };
    });
  }

  handleCityFilter(e) {
    const { value } = e.target;

    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          cities: prevState.filters.cities.find(item => item === value)
            ? prevState.filters.cities.filter(item => item !== value)
            : prevState.filters.cities.concat(value)
        }
      };
    });
  }

  render() {
    const { isFetching, data } = this.state.people;
    const { genders, allCities, cities } = this.state.filters;

    return (
      <div className="App">
        <header>
          <h1>People Directory</h1>
        </header>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <Filters
              onGenderChange={this.handleGenderFilter}
              genders={genders}
              allCities={allCities}
              onCityChange={this.handleCityFilter}
              cities={cities}
            />
            <List people={data} />
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
