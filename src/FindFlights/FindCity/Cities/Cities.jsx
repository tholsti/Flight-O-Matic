import React, { Component } from 'react'

export default class Cities extends Component {
  pickCity = (city) => {
    this.props.pickCity({
      city: city.name,
      county: city.country
    })
    document.getElementById('find_city').value = city.name + ', ' + city.country.name
    document.getElementById('citiesList').style.display = "none"
  }

  render() {
    return (

      <ul id="citiesList">
        {console.log(this.props.cities)}
        {this.props.cities.map(city => {
          return <li onClick={() => this.pickCity(city)} className="city">{city.name + ', '+ city.country.id}</li>
        })
        }
      </ul>
    )
  }
}
