import React, { Component } from 'react';

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
    this.isGenderSelected = this.isGenderSelected.bind(this);
    this.isCitySelected = this.isCitySelected.bind(this);
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

  isGenderSelected(user) {
    const { genders } = this.state.filters;
    return !genders.length || genders.includes(user.gender);
  }

  isCitySelected(user) {
    const { cities } = this.state.filters;
    return !cities.length || cities.includes(user.location.city);
  }

  getFilteredPeople() {
    const { data } = this.state.people;

    return data.filter(user => {
      return this.isGenderSelected(user) && this.isCitySelected(user);
    });
  }

  getFilteredPeopleSimpleVersion() {
    const { data } = this.state.people;
    const { genders, cities } = this.state.filters;

    return data
      .filter(user => {
        if (!genders.length) {
          return true;
        } else {
          return genders.includes(user.gender);
        }
      })
      .filter(user => {
        if (!cities.length) {
          return true;
        } else {
          return cities.includes(user.location.city);
        }
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
    const { isFetching } = this.state.people;
    const { genders, allCities, cities } = this.state.filters;

    return (
      <div className="App">
        <header>
          <h1 className="App__title">People Directory</h1>
        </header>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <main className="App__main">
            <aside className="App__left-column">
              <Filters
                onGenderChange={this.handleGenderFilter}
                genders={genders}
                allCities={allCities}
                onCityChange={this.handleCityFilter}
                cities={cities}
              />
            </aside>
            <List people={this.getFilteredPeople()} />
          </main>
        )}
      </div>
    );
  }
}

export default App;
