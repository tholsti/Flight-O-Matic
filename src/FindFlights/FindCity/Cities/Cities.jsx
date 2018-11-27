import React, { Component } from 'react'

export default class Cities extends Component {
  pickCity = (city) => {
    console.log(city)
  }

  render() {
    return (
      <ul id="citiesList">
        {console.log(this.props.cities)}
        {this.props.cities.map(city => {
          return <li onClick={() => this.pickCity(city)} className="city">{city}</li>
        })
        }
      </ul>
    )
  }
}
