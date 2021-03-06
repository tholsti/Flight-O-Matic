import React from 'react';


export default class Flight extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      additionalInfoVisible: false
    }
  }

  handleClick = () => {
    console.log(this.state.additionalInfoVisible);
    this.state.additionalInfoVisible ? 
      this.setState({
        additionalInfoVisible: false
      }) :
      this.setState({
        additionalInfoVisible: true
      })
  }

  render() {
    return (
      <div className="flight-result">
        <div className="flight-item" onClick={this.handleClick}>
          <div className="info-btn" >{this.props.number + 1}</div>
          <div className="flight-prop">{this.props.departureTime}</div>
          <div className="flight-prop">{this.props.arrivalTime}</div>
          <div className="flight-prop">{this.props.originCity}</div>
          <div className="flight-prop">{this.props.destinationCity}</div>
          <div className="flight-prop">{this.props.flightPrice} EUR <b>BARGAIN!</b></div>
          <div className="flight-prop">{this.props.stopOvers}</div>
        </div>
          {this.state.additionalInfoVisible === true &&
          <div className="additionalInfo" id="additionalInfo">
            Here will be additional info about flights
          </div>}
      </div>
    );
  }
}

