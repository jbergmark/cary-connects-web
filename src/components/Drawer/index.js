import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Context } from "src/components/Provider";
import SideList from './SideList'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PolygonCenter from 'geojson-polygon-center'
import classnames from 'classnames'


const drawerWidth = 240;
const horizontalWidth = 240;
const verticalHeight = 240;

const styles = theme => ({
  rootHorizontal: {
    width: horizontalWidth,
  },
  rootVertical: {
    height: verticalHeight,
    width: '80%'
  },
  drawer: {
    flexShrink: 0,
    height: '100%',
  },
  drawerPaper: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    padding: '24px 0'
  },
  horizontalDrawer: {
    width: horizontalWidth,
    height: '100%'
  },
  verticalDrawer: {
    width: '100%',
    height: verticalHeight, 
  },
  header: {
    margin: '0 10px'
  }
});

const cursor = {
  cursor: 'pointer'
};

const applyClasses = (viewport, classes) => {
  switch(viewport) {
    case 'mobile-landscape':
    case 'tablet-landscape':
    case 'desktop':
      return classnames(classes.drawer, classes.horizontalDrawer);
    case 'mobile-portrait':
    case 'tablet-portrait':
      return classnames(classes.drawer, classes.verticalDrawer);
    default: 
      return classnames(classes.drawer, classes.horizontalDrawer);
  }
}

const rootClass = (view, classes) => {
  if(view === 'vertical'){
    return classes.rootVertical;
  }else if(view === 'horizontal'){
    return classes.rootHorizontal;
  }
}

class index extends Component {

  openGoogleMaps(coords) {
    const center = PolygonCenter(coords)
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=" +
        center.coordinates[0] +
        "," +
        center.coordinates[1]
    )
  }

  render() {
    const { classes } = this.props;
    const device = this.props.device;

    return (
      
        <Context.Consumer>
          {context => (
            <div className={rootClass(context.determineView(device), classes)}>
              <Drawer
                variant='persistent'
                anchor='left'
                open={context.state.drawerOpen}
                className={applyClasses(device, classes)}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                  <div className={classes.header} onClick={context.handleDrawerClose}>
                    <Grid container justify='space-between'>
                      <Grid item>
                        <Typography variant='title'>
                          <strong>Parking Lot </strong>
                          {context.state.drawerOpen ? '-> ' + context.state.selectedMapItem[0].properties.name: null}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <ChevronLeftIcon className={classes.icon} style={cursor}/>
                      </Grid>
                    </Grid>
                  </div>

                {context.state.drawerOpen ? <SideList data={this.props.data} openGoogleMaps={this.openGoogleMaps}/> : null}
              </Drawer>
            </div>
          )}
        </Context.Consumer>
      
    )
  }
}

export default withStyles(styles)(index);
