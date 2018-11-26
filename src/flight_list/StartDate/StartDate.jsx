import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class StartDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        }
        this.setDate = this.setDate.bind(this)
    }
    

    setDate = (e) => {
        let date = e.getDate() + '/' + (e.getMonth() + 1) + '/' + e.getUTCFullYear()
        console.log(e)
        this.setState({
            startDate : e
        })
        this.props.setDate({date : date})
    }
      
    render() {
        return (
        <div>
            <p>Start date:</p>
            <DatePicker 
                selected={this.state.startDate}
                onSelect={this.setDate}
                dateFormat="MMMM d, yyyy"
            />
        </div>)
}
}
