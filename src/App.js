import React from 'react';
import Provider, { Context } from './components/Provider';
import classnames from 'classnames';
//material-ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//components
import Drawer from 'src/components/Drawer';
import Map from 'src/components/Map';
import NavigationMenu from './components/NavigationMenu';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    position: 'relative'
  },
  bodyContainer: {
    'height': '100%',
    'display': 'flex',
    'alignItems': 'stretch',
    position: 'relative'
  },
  content: {
    flexgrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  }
});

class App extends React.Component {
  render () {
    const { classes } = this.props;

    return (
      <Provider>
        <Context.Consumer>
          {context => (
            <div classname={classes.root} onClick={context.clearResults}>
              <NavigationMenu />
            </div>
          )}
        </Context.Consumer>
      </Provider>
    )
  }
}

export default withStyles(styles)(App);