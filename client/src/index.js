import React from 'react';
import { render } from 'react-dom';
// import '../public/index.html';
import FlightList from './FlightList/FlightList.jsx';
import './css/app.scss'


class App extends React.Component {
  render() {
    return <FlightList />
  }
}

render(<App />, document.querySelector('#root'));