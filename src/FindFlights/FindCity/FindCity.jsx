import React, { Component } from 'react'
import Cities from './Cities/Cities.jsx'

export default class FindCity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      citiesFound: false,
      cities: [],
      pickedCity: ""
    }
  }

  componentDidMount() {
    console.log(this.props)
    let citySearch = document.getElementById('find_city')
    citySearch.addEventListener('keyup', () => {
      if (citySearch.value.length >= 3) { 
        this.setState({
          citiesFound: false,
          cities: []
        })
        fetch(`https://api.skypicker.com/locations?term=${citySearch.value}`)
        .then(response => response.json())
        .then(json => {
          console.log(json.locations)
          json.locations.map(
            city => {
              if (city.airports > 0){ 
                this.setState({
                  citiesFound: true,
                  cities: [...this.state.cities, city]
                })}
              }
          )
          })}
      else {
        this.setState({
          citiesFound: false,
          cities: []
        })
      }
      
    })
  }

  render() {
    return (
      <div>
        <p>Leaving from:</p>
        <input type="text" name="find_city" id="find_city"/>
        {this.state.citiesFound == true ? 
        <Cities cities={this.state.cities} pickCity={this.props.setCity} />:
        ""}
      </div>
    )
  }
}
