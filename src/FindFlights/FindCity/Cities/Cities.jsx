import React, { Component } from 'react'

export default class Cities extends Component {
  pickCity = (city) => {
    this.props.pickCity({
      city: city
    })
    document.getElementById('find_city').value = city
    document.getElementById('citiesList').innerHTML = ""
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
