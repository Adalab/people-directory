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
      }
    };
  }

  componentDidMount() {
    this.getPeople();
  }

  getPeople() {
    fetchPeople().then(data => {
      this.setState({
        people: {
          data: data.results,
          isFetching: false
        }
      });
    });
  }

  render() {
    const {isFetching, data} = this.state.people;

    return (
      <div className="App">
        <header>
          <h1>People Directory</h1>
        </header>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <Filters />
            <List
              people={data}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
