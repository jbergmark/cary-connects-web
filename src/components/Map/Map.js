import React, { Component } from "react";
import L from "leaflet";
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Polygon
} from "react-leaflet";
import parkingIcon from "../../assets/parkingIcon.png";
import { Context } from "../../components/Provider";
import {withStyles} from '@material-ui/core/styles';

//height of map when drawer is open
const verticalViewHeight = '50vh';
const horizontalViewHeight = '70vh';


const styles = theme => ({
  mapHorizontal: {
    height: horizontalViewHeight,
  },
  mapVertical: {
    height: verticalViewHeight,
  },
  a: {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 300,
  },
  map: {
    height: '100%'
  }
})


// Due to a bug in react-leaflet Marker isn't working.
// Using Leaflet to create an image

var pIcon = L.icon({
  iconUrl: parkingIcon,
  iconSize: [38, 38],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});


const applyMapClass = (view, drawerOpen, classes) => {
  if(view === 'vertical' && drawerOpen){
    return classes.mapVertical;
  }else{
    return classes.mapHorizontal;
  }
}

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
    // this.handleClick = this.handleClick.bind(this);
  }
  mapClasses = applyMapClass(this.props.view, this.props.drawerOpen, this.props.classes)

  componentWillUpdate() {
    this.mapClasses = applyMapClass(this.props.view, this.props.drawerOpen, this.props.classes)
    
  }

  render() {
    const { classes } = this.props;
    const device = this.props.device;
    if (!this.props.polygonData) {
      return <div></div>;
    }

    return (
      // build a Map
      <div className={classes.map}>
      <Context.Consumer>
        {context => (
          <LeafletMap
            className={this.mapClasses}
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
            <Marker icon={pIcon} position={context.state.markers[0]}></Marker>

            {this.props.polygonData.map(polygonData => (
              <Polygon
                onClick={(event) => {context.createLotMarker(polygonData); context.clickPolygon(event);}}
                positions={polygonData.geometry.coordinates[0]}
                color="red"
                name={polygonData.properties.name}
                key={polygonData.geometry.coordinates[0]}
              >
                {/*<Popup>
                  <center>
                    <h3>{polygonData.properties.name}</h3>
                    <Button>
                      <directions
                        onClick={this.toGoogleMaps.bind(this, polygonData)}
                      >
                        Directions
                      </directions>
                    </Button>
                  </center>
                </Popup>*/}
              </Polygon>
            ))}
          </LeafletMap>
        )}
      </Context.Consumer>
      </div>
    );
  }
}

export default withStyles(styles)(Map);
