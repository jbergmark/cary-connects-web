import React from 'react'
import ReactDOM from 'react-dom'
import 'leaflet/dist/leaflet.css'
import './components/Map/styles.css'
import registerServiceWorker from './utilities/registerServiceWorker'
import Theme from './Theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

ReactDOM.render(
  <Theme>
    <CssBaseline>
      <App />
    </CssBaseline>
  </Theme>
  , document.getElementById('root'))
registerServiceWorker()
