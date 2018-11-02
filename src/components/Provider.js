import React, { Component } from "react";
import flip from "geojson-flip";
import filterLocation from './NavigationMenu/filterLocation'
import PolygonCenter from 'geojson-polygon-center'

export const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);

  this.state = {
    selectedMapItem: null,
    businessData: null,
    parkingData: null,
    location: {
      lat: 35.787317,
      lng: -78.781226
    },
    zoom: 15,
    filteredLocation: filterLocation("", 0),
    handleSearchChange: null,
    searchValue: "",
    drawerOpen: false,
    searchResultsAnchorEl: null
  };
}

  componentDidMount() {
    return new Promise((resolve, reject) => {
      fetch(
        "https://raw.githubusercontent.com/CodeForCary/cary-connects-data/master/business.geojson"
      )
      .then(response => response.json())
      .then(rawJSON => rawJSON.features)
      .then(data => resolve(this.setState({ businessData: data })))
      .catch(err => reject(err));
      fetch(
        "https://raw.githubusercontent.com/CodeForCary/cary-connects-data/master/parking.geojson"
      )
      .then(response => response.json())
      .then(rawJSON => flip.flip(rawJSON.features))
      .then(data => resolve(this.setState({ parkingData: data })))
      .catch(err => reject(err));
    });
  }

  refocusLocation = name => {
    let feature = this.state.businessData.find(
      feature => feature.properties.name == name.properties.name
    );
    this.setState({
      location: {
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
      },
      zoom: 17.33,
      filteredLocation: filterLocation("", 0),
      searchValue: name.properties.name,
      searchResultsAnchorEl: false
    });
  }

  render() {
    return (
      <Context.Provider
      value={{
        state: this.state,
        clickPolygon: event => {
          const name = event.target.options.name;
          const parkingData = this.state.parkingData.filter(
            selectedPolygon => selectedPolygon.properties.name === name
          );
          this.setState({
            selectedMapItem: parkingData
          });
          this.setState({drawerOpen: true})
        },
        moveMap: location => {
          this.setState({
            location: {
              lat: location.latlng.lat,
              lng: location.latlng.lng
            },
            zoom: location.zoom
          });
        },
          chooseBusiness: this.refocusLocation,
          handleSearchChange: event => {
            if (event.target.value == 0) {
              this.setState({
              filteredLocation: filterLocation(event.target.value, 0),
              searchValue: event.target.value,
              searchResultsAnchorEl: event.target
            });
          } else {
            this.setState({
              filteredLocation: filterLocation(event.target.value, 7, this.state.businessData),
              searchValue: event.target.value,
              searchResultsAnchorEl: event.target
            })
          }},
          clearResults: event => {
            this.setState({
              filteredLocation: filterLocation("", 0),
            })
          },
          openGoogleMaps: event => {
            console.log(event.target.value)
            const center = PolygonCenter(event.target.value)
            window.open(
              "https://www.google.com/maps/dir/?api=1&destination=" +
                center.coordinates[0] +
                "," +
                center.coordinates[1]
            )
          },
          clearSearch: event => {
            this.setState({
              searchValue: "",
              searchResultsAnchorEl: null
            })
          },
          handleDrawerClose: event => {
            this.setState({drawerOpen: false})
          },
          handleSearchResultsOpen: event => {
            this.setState({searchResultsAnchorEl: event.target})
          }
        }}
        >
        {this.props.children}
        </Context.Provider>
      );
    }
  }

  export default Provider;
