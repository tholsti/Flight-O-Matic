import React from 'react';


export default class FlightItem extends React.Component {
 

  render() {
    return (
      <div className="flight-item">
        <div className="flight-prop">{this.props.departureTime}</div>
        <div className="flight-prop">{this.props.arrivalTime}</div>
        <div className="flight-prop">{this.props.originCity}</div>
        <div className="flight-prop">{this.props.destinationCity}</div>
        <div className="flight-prop">${this.props.flightPrice} <b>BARGAIN!</b></div>
        <div className="flight-prop">{this.props.stopOvers}</div>

      </div>
    );
  }
}

