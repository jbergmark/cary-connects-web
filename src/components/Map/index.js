import React from 'react';
import classnames from 'classnames';
import { Context } from './../Provider';

//material-ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

//components
import Map from './Map';

const drawerWidth = 240;
const drawerHeight = 175;

const styles = theme => ({
  contentHorizontal: {
    flexgrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
  },
  contentShiftHorizontal: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0,
  },
  contentVertical: {
    flexgrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginBottom: 0,
  },
  contentShiftVertical: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginBottom: 0,
  },
});

const applyClasses = (view, drawerOpen, classes) => {
  if(view === 'horizontal'){
    return classnames(classes.contentHorizontal, {[classes.contentShiftHorizontal]: drawerOpen});
  }else if(view === 'vertical'){
    return classnames(classes.contentVertical, {[classes.contentShiftVertical]: drawerOpen});
  }
}


class MapComponent extends React.Component {
  render() {
    const { classes } = this.props;
    const device = this.props.device;
    return(
      <Context.Consumer>
        {context => (
          <Grid container className={applyClasses(context.determineView(device), context.state.drawerOpen, classes)} justify="center" alignItems="center">
            <Grid item xs={10} className={classes.map}>
              <Map drawerOpen={context.state.drawerOpen} device={device} view={context.determineView(device)} polygonData={context.state.parkingData} />
            </Grid>
          </Grid>
        )}
      </Context.Consumer>
    )
  }
}

export default withStyles(styles)(MapComponent);