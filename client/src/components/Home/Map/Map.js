import React, { Component } from "react";
import L from "leaflet";
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Polygon
} from "react-leaflet";
import icon from "src/assets/map-marker-2.svg";
import moment from "moment";
import { Context } from "src/components/Provider";
import "./styles.css";

const pIcon = L.icon({
  iconUrl: icon,
  iconSize: [32, 32],
  shadowSize: [50, 64],
  iconAnchor: [15, 31]
})

class Map extends Component {
  state = {
    minZoom: 15,
    animate: true,
    bounds: [[35.773958, -78.798776], [35.796304, -78.761682]]
  };
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  }

  render() {
    if (!this.props.polygonData) {
      return <div></div>;
    }

    return (
      // build a Map
      <div>
        <Context.Consumer>
          {context => (
            <LeafletMap
              className="map"
              maxBounds={this.state.bounds}
              center={context.state.location}
              minZoom={this.state.minZoom}
              zoom={context.state.zoom}
              markers={context.state.markers}
            >
              <TileLayer // attribution is required for OSM
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {context.state.markers.map(function (marker, index) {
                return <Marker icon={pIcon} position={context.state.markers[index]}></Marker>;
              })}

              {this.props.polygonData
                .filter(polygonData => !polygonData.inactiveStart 
                  || (!polygonData.inactiveEnd && moment().isAfter(moment(polygonData.inactiveStart)))
                  || moment().isBetween(moment(polygonData.inactiveStart), moment(polygonData.inactiveEnd)))
                .map(polygonData => {
                  return (
                    <Polygon
                      onClick={(event) => { context.createLotMarkerAtEntrance(polygonData); context.clickPolygon(event); }}
                      positions={polygonData.geometry.coordinates[0]}
                      fillColor={polygonData.properties.fill}
                      fillOpacity={polygonData.properties["fill-opacity"]}
                      color={polygonData.properties.stroke}
                      opacity={polygonData.properties.opacity}
                      weight={polygonData.properties["stroke-width"]}
                      name={polygonData.properties.name}
                      key={polygonData.geometry.coordinates[0]}
                    >
                    </Polygon>
                  )
                }

                )}
            </LeafletMap>
          )}
        </Context.Consumer>
      </div>
    );
  }
}

export default Map;
