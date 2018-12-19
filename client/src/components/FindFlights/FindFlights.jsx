import React from 'react';
import StartDate from './StartDate/StartDate.jsx'
import EndDate from './EndDate/EndDate.jsx'
import { parseDate } from '../../helpers.js';
import FindCity from './FindCity/FindCity.jsx'

export default class FindFlights extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            origin: "Prague",
            destination: "London",
            direct : 0,
            flightsNumber: this.props.flightsNumber,
            startDate: parseDate(new Date()),
            endDate: parseDate(new Date()),
        };
    }
    
    setStartDate = (date) => {
        this.setState({
        startDate: date.date
        })
    }
    
    setEndDate = (date) => {
        this.setState({
        endDate: date.date
        })
    }

    setOrigin = (city) => {
        console.log(city)
        this.setState({
            origin: city.id
        })
    }

    setDestination = (city) => {
        console.log(city)
        this.setState({
            destination: city.id
        })
    }

    action = (e) => {
        this.props.action({
            origin: this.state.origin,
            destination: this.state.destination,
            direct: (document.getElementById('direct_flights').checked ? 1 : 0),
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });
    }

    render() {
        return (
            <div>
                <div className="search">
                    <div className="dates">
                        <StartDate setDate={this.setStartDate}/>
                        <EndDate setDate={this.setEndDate}/>
                    </div>
                    <div className="locations">
                        <FindCity point="origin" setCity={this.setOrigin} ></FindCity>
                        <FindCity point="destination" setCity={this.setDestination} ></FindCity>
                    </div>
    
                    <br /> 
                    <p><input type="checkbox" name="checkbox" id="direct_flights"/>direct flights only</p>
                                        
                </div>    
                <div className="button-container">
                    <button className="searchbtn" onClick={this.action}>Search!</button>
                </div>
            </div>
        )
    }
}