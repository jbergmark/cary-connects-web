import React from 'react';
import { Context } from './components/Provider';
import MediaQuery from 'react-responsive';
//material-ui
import { withStyles } from '@material-ui/core/styles';
//components
import Drawer from 'src/components/Drawer';
import Map from 'src/components/Map';
import NavigationMenu from './components/NavigationMenu';
import Container from './components/Container';

const styles = theme => ({
  root: {
    position: 'relative'
  }
});

const size = {
  desktop: 1224,
  tablet: {
    portrait: 768,
    landscape: 1024
  },
  mobile: {
    landscape: 376,
    portrait: 366
  }
}


class App extends React.Component {
  render () {
    const { classes } = this.props;

    return (
      <Context.Consumer>
        {context => (
          <div className={classes.root} onClick={context.clearResults}>
          {console.log(context.state)}
            <NavigationMenu />

            {/* Mobile Portrait */}
            <MediaQuery maxWidth={size.mobile.landscape - 1}>
              <Container device={'mobile-portrait'}>
                <Drawer device={'mobile-portrait'} data={context.state.selectedMapItem ? context.state.selectedMapItem : null} />
                <Map device={'mobile-portrait'}/>
              </Container>
            </MediaQuery>
            {/* Mobile Landscape */}
            <MediaQuery minWidth={size.mobile.landscape} maxWidth={size.tablet.portrait - 1}>
              <Container device={'mobile-landscape'}>
                <Drawer device={'mobile-landscape'} data={context.state.selectedMapItem ? context.state.selectedMapItem : null} />
                <Map device={'mobile-landscape'}/>
              </Container>
            </MediaQuery>
            {/* Tablet Portrait */}
            <MediaQuery minWidth={size.tablet.portrait} maxWidth={size.tablet.landscape - 1}>
              <Container device={'tablet-portrait'}>
                <Drawer device={'tablet-portrait'} data={context.state.selectedMapItem ? context.state.selectedMapItem : null} />
                <Map device={'tablet-portrait'}/>
              </Container>
            </MediaQuery>
            {/* Tablet Landscape */}
            <MediaQuery minWidth={size.tablet.landscape} maxWidth={size.desktop - 1}>
              <Container device={'tablet-landscape'}>
                <Drawer device={'tablet-landscape'} data={context.state.selectedMapItem ? context.state.selectedMapItem : null} />
                <Map device={'tablet-landscape'}/>
              </Container>
            </MediaQuery>
            {/* Desktop */}
            <MediaQuery minWidth={size.desktop}>
              <Container device={'desktop'}>
                <Drawer device={'desktop'} data={context.state.selectedMapItem ? context.state.selectedMapItem : null} />
                <Map device={'desktop'}/>
              </Container>
            </MediaQuery>

            
          </div>
        )}
      </Context.Consumer>
    )
  }
}

export default withStyles(styles)(App);