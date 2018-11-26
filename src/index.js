import React from 'react';
import { render } from 'react-dom';
import './index.css';
import './index.html';
import FlightList from './FlightList/FlightList.jsx';


class App extends React.Component {
  render() {
    return <FlightList />
  }
}

render(<App />, document.querySelector('#app'));