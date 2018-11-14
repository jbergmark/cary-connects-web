import React from 'react';
import classnames from 'classnames';

//material-ui
import { withStyles } from '@material-ui/core/styles';

const styles = Theme => ({
  default: {
    'height': '100%',
    'display': 'flex',
    'alignItems': 'stretch',
    position: 'relative',
  },
  horizontal: {
    flexDirection: 'row',
    backgroundColor: 'pink'
  },
  vertical: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },
});

const applyClasses = (viewport, classes) => {
  switch(viewport) {
    case 'mobile-landscape':
    case 'tablet-landscape':
    case 'desktop':
      return classnames(classes.default, classes.horizontal);
    case 'mobile-portrait':
    case 'tablet-portrait':
      return classnames(classes.default, classes.vertical);
    default: 
      return classnames(classes.default, classes.horizontal);
  }
}


class Container extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={applyClasses(this.props.device, classes)}>
        {this.props.children}
        {console.log(this.props.device)}
      </div>
    );
  }
}

export default withStyles(styles)(Container);
