import React from 'react';
import { timingSafeEqual } from 'crypto';
import StartDate from './StartDate/StartDate.jsx'
import EndDate from './EndDate/EndDate.jsx'
import { parseDate } from '../helpers.js';


const destinations = ['Valencia', 'Barcelona', 'Madrid', 'Milan', 'Athens',  'Helsinki', 'Kittila', 'Stockholm'];
const origins = ['Prague', 'Berlin', 'Warsaw', 'Pardubice'];


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

    action = (e) => {
        // console.log("origin:" + document.getElementById('origin').value)
        // console.log("destination:" + document.getElementById('destination').value)
        // console.log(document.getElementById('direct_flights').checked);

        
        this.props.action({
            origin: document.getElementById('origin').value,
            destination: document.getElementById('destination').value,
            direct: (document.getElementById('direct_flights').checked ? 1 : 0),
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });
    }

    render() {
        return (
            <div>
                <div className="search">
                    <StartDate setDate={this.setStartDate}/>
                    <EndDate setDate={this.setEndDate}/>
    
                    <div className="cityPick">
                        <p>Departure City</p>
                        <select id="origin" className="origins">
                            { origins.map((origin, i)  => 
                                <option value={origin} key={i} selected={(origin == this.state.origin) ? true : false }>{origin}</option>
                            )
                            }   
        
                        </select>
                    </div>
                    <div className="cityPick">
                        <p>Destination City</p>
                        <select id="destination">
                            { destinations.map((destination, i) =>
                                <option key={i}>{destination}</option>
                            )
                            }  
                        </select>
                    </div>
                    <br /> 
                    <input type="checkbox" name="checkbox" id="direct_flights"/>direct flights only <br></br>
                                        
                </div>    
                <div className="buttons">
                    <button className="searchbtn" onClick={this.action}>Search!</button>
                </div>
            </div>
        )
    }
}