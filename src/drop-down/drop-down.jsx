import React from 'react';
import { timingSafeEqual } from 'crypto';

const destinations = ['Valencia', 'Barcelona', 'Madrid', 'Milan', 'Athens',  'Helsinki', 'Kittila', 'Stockholm'];
const origins = ['Prague', 'Berlin', 'Warsaw', 'Pardubice'];


export default class DropDown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            origin: "Prague",
            destination: "London",
            direct : 0,
            flightsNumber: this.props.flightsNumber
        
        };
    }

    action = (e) => {
        console.log("origin:" + document.getElementById('origin').value)
        console.log("destination:" + document.getElementById('destination').value)
        console.log(document.getElementById('direct_flights').checked);

        
        this.props.action({
            origin: document.getElementById('origin').value,
            destination: document.getElementById('destination').value,
            direct: (document.getElementById('direct_flights').checked ? 1 : 0),
        });
    }

    render() {
        return (
            <div className="search">
                <p>Departure City</p>
                <select id="origin" className="origins">
                    { origins.map((origin, i)  => 
                        <option value={origin} key={i} selected={(origin == this.state.origin) ? true : false }>{origin}</option>
                    )
                    }   

                </select>
                <p>Destination City</p>
                <select id="destination">
                    { destinations.map((destination, i) =>
                        <option key={i}>{destination}</option>
                    )
                    }  
                </select>
                <br /> 
                <input type="checkbox" name="checkbox" id="direct_flights"/>direct flights only <br></br>
                <div className="buttons">
                    <button className="showmore" onClick={ this.props.showMore}>Show more</button>
                    <button className="searchbtn" onClick={this.action}>Search!</button>
                </div>
                
            </div>
        )
    }
}