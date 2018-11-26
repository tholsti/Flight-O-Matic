import React from 'react';
import FlightItem from '../flight_item/flight_item.jsx';
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
      flightsNumber: 5,
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
            endDate: data.endDate
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
              <h1>SkyScammer</h1>
            </div>
            <FindFlights />
          </header>

          <div className="flight_list">
            <div className="flight-item">
              <div className="flight-prop col-name">Departure time</div>
              <div className="flight-prop col-name">Arrival time</div>
              <div className="flight-prop col-name">Origin city</div>
              <div className="flight-prop col-name">Destination city</div>
              <div className="flight-prop col-name">Price</div>
              <div className="flight-prop col-name">Stopovers</div>

            </div>
            <div className="spinner-container">
              <img className="loading-spinner" src="https://www.flightcomp.de/wp-content/plugins/gravityforms/images/spinner.gif" />
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
            <h1>SkyScammer</h1>
          </div>
          
          <FindFlights action={this.selectedRoute} showMore={this.showMore} />
        </header>
        <h3>Displaying flights from {this.state.origin} to {this.state.destination}</h3>

        <div className="flight_list">
          <div className="flight-item">
            <div className="flight-prop col-name">Departure time</div>
            <div className="flight-prop col-name">Arrival time</div>
            <div className="flight-prop col-name">Origin city</div>
            <div className="flight-prop col-name">Destination city</div>
            <div className="flight-prop col-name">Price</div>
            <div className="flight-prop col-name">Stopovers</div>

          </div>
          {this.state.flights.slice(0, this.state.flightsNumber).map(
            flight => <FlightItem
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
      </>
    )
  }
}