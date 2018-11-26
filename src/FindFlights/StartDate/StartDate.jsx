import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {parseDate} from '../../helpers.js'

export default class StartDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedDate: new Date()
        }
        this.setDate = this.setDate.bind(this)
    }
    

    setDate = (e) => {
        let date = parseDate(e)
        console.log(date)
        
        this.setState({
            pickedDate : e
        })
        this.props.setDate({date : date})
    }
      
    render() {
        return (
        <div className="datePick">
            <p>Start date:</p>
            <DatePicker 
                selected={this.state.pickedDate}
                onSelect={this.setDate}
                dateFormat="MMMM d, yyyy"
            />
        </div>)
}
}
