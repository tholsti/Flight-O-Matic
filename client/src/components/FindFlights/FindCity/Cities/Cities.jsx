import React, { Component } from 'react'

export default class Cities extends Component {
  pickCity = (city) => {
    this.props.pickCity({
      city: city.name,
      country: city.country,
      id: city.id
    })
    document.getElementById(`find_city-${this.props.point}`).value = city.name + ', ' + city.country.name
    document.getElementById(`citiesList-${this.props.point}`).style.display = "none"
  }

  render() {
    return (

      <ul id={"citiesList-"+this.props.point}>
        {console.log(this.props.point)}
        {this.props.cities.map(city => {
          return <li onClick={() => this.pickCity(city)} className="city">{city.name + ', '+ city.country.id}</li>
        })
        }
      </ul>
    )
  }
}
