import React from 'react';
import { DateTime } from 'luxon';
import Flight from '../Flight/Flight';
import FindFlights from '../FindFlights/FindFlights';
import spinner from '../../img/spinner.gif';

interface FlightData {
  dTime: number,
  aTime: number,
  cityFrom: string,
  cityTo: string,
  price: number,
  route: {}[],
}

export default class FlightList extends React.Component {
  state = {
      flights: [],
      isLoading: false,
      searched: 'big',
      origin: '',
      destination: '',
      flightsNumber: 10,
      connectionsFound: 0,
  }


  selectedRoute = (data: any) => {
      const API_URL = 'https://api.skypicker.com/flights';
      const FLY_FROM = `flyFrom=${data.origin}`;
      const FLY_TO = `to=${data.destination}`;
      const START_DATE = `dateFrom=${data.startDate}`;
      const END_DATE = `dateTo=${data.endDate}`;
      const URL = `${API_URL}?${FLY_FROM}&${FLY_TO}&${START_DATE}&${END_DATE}&partner=picky&direct_flights=${data.direct}`;

      if (data) {
          this.setState({
              isLoading: true,
          });
          fetch(URL)
              .then(resp => resp.json())
              .then((json) => {
                  this.setState({
                      flights: json.data,
                      origin: data.origin,
                      destination: data.destination,
                      isLoading: false,
                      searched: 'small',
                      connectionsFound: json.data.length,
                      flightsNumber: 10,
                  });
              })
              .catch(exception => console.log(exception));
      }
  }

  private showMore = () => {
      this.setState({ flightsNumber: this.state.flightsNumber + 5 });
  }

  public render() {
      if (this.state.isLoading) {
          return (
        <>
            <header className={this.state.searched}>
                <div className={'title'}>
                    <h1>Flight-O-Matic</h1>
                </div>
                <FindFlights />
            </header>
            <div className={'flight_list'}>
                <div className={'spinner-container'}>
                    <img className={'loading-spinner'} alt={'loading spinner'} src={spinner} />
                    Hold tight, fetching flights...
                </div>
            </div>
        </>
          );
      }

      return (
      <>
          <header className={this.state.searched}>
              <div className={'title'}>
                  <h1>Flight-O-Matic</h1>
              </div>
              <div className={'search-panel'}>
                  <FindFlights action={this.selectedRoute} showMore={this.showMore} />
              </div>
          </header>
          <div>
              {this.state.flights.length > 0
              && (
                  <h3>
                      {`Displaying flights from ${this.state.origin} to ${this.state.destination}`}
                  </h3>
              )}
          </div>

          <div className="flight_list">
              <div>
                  {this.state.flights.length > 0
                    && (
                        <div className="flight-item-titles">
                            <div className="info-btn" />
                            <div className="flight-prop col-name">Departure time</div>
                            <div className="flight-prop col-name">Arrival time</div>
                            <div className="flight-prop col-name">Origin city</div>
                            <div className="flight-prop col-name">Destination city</div>
                            <div className="flight-prop col-name">Price</div>
                            <div className="flight-prop col-name">Stopovers</div>
                        </div>)}
              </div>

              {this.state.flights.slice(0, this.state.flightsNumber).map(
                  (flight: FlightData, index) => (<Flight
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
                  ),
              )}
          </div>

          {this.state.connectionsFound > 0
              ? (
                  <div className="connectionsFound">
                      <div>
                          {`Number of connections found: ${this.state.connectionsFound}`}
                      </div>
                      {this.state.connectionsFound > this.state.flightsNumber
                      && <button type="submit" className="showmore" onClick={this.showMore}>Show more</button>
                      }
                  </div>
              )
              : (
                  <div>
                  No connections found
                  </div>
              )}
      </>
      );
  }
}
