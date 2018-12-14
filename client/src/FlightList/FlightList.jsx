import React from 'react';
import Flight from '../Flight/Flight.jsx';
import FindFlights from '../FindFlights/FindFlights.jsx';
import { DateTime } from 'luxon';
import { parseDate } from '../helpers.js';

export default class FindFlight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      isLoading: false,
      searched: "big",
      origin: '',
      destination: '',
      flightsNumber: 10,
      data: null
    }
  }


  selectedRoute = (data) => {
    console.log(data)
    if (data) {
      this.setState({ 
        isLoading: true
      })
      fetch(`https://api.skypicker.com/flights?flyFrom=${data.origin}&to=${data.destination}&dateFrom=${data.startDate}&dateTo=${data.endDate}&partner=picky&direct_flights=${data.direct}`)
        .then(resp => resp.json())
        .then(json => {
          this.setState({
            flights: json.data,
            origin: data.origin,
            destination: data.destination,
            isLoading: false,
            searched: "small",
            startDate: data.startDate,
            endDate: data.endDate,
            connectionsFound: json.data.length,
            flightsNumber: 10,
            data: json.data

          });
        });
    }
  }
 

  showMore = ()  => {
    this.setState({flightsNumber: this.state.flightsNumber + 5});
  }
  
  render() {
    if (this.state.isLoading == true) {
      return (
        <>
          <header className={this.state.searched}>
            <div className="title">
              <h1>Flight-O-Matic</h1>
            </div>
            <FindFlights />
          </header>

          <div className="flight_list">
            
            <div className="spinner-container">
              <img className="loading-spinner" src="../src/img/spinner.gif" />
              Hold tight, fetching flights...
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <header className={this.state.searched}>
          <div className="title">
            <h1>Flight-O-Matic</h1>
          </div>
          <div className="search-panel">
            <FindFlights action={this.selectedRoute} showMore={this.showMore} />
          </div>
        </header>
        <div>
          { this.state.flights.length > 0 && 
          <h3>Displaying flights from {this.state.origin} to {this.state.destination}</h3>
          }
        </div>

        <div className="flight_list"><div>
        { this.state.flights.length > 0 && 
            <div className="flight-item-titles">
              <div className="info-btn"> </div>
              <div className="flight-prop col-name">Departure time</div>
              <div className="flight-prop col-name">Arrival time</div>
              <div className="flight-prop col-name">Origin city</div>
              <div className="flight-prop col-name">Destination city</div>
              <div className="flight-prop col-name">Price</div>
              <div className="flight-prop col-name">Stopovers</div>
            </div>}
          </div>

          {this.state.flights.slice(0, this.state.flightsNumber).map(
            (flight, index) => <Flight
              number={index}
              departureTime={
                DateTime.fromMillis(flight.dTime * 1000).toFormat('dd.MM.yyyy hh:mm')}
              arrivalTime={
                DateTime.fromMillis(flight.aTime * 1000).toFormat('dd.MM.yyyy hh:mm')}
              originCity={flight.cityFrom}
              destinationCity={flight.cityTo}
              flightPrice={flight.price}
              stopOvers={flight.route.length - 1}
            />
          )}

        </div>
        {this.state.connectionsFound &&
        <div className="connectionsFound">
          <div>Number of connections found: {this.state.connectionsFound}<br></br>
          </div>
          {this.state.connectionsFound > this.state.flightsNumber &&
            <button className="showmore" onClick={ this.showMore}>Show more</button>
          }
        </div>
        }
      </>
    )
  }
}