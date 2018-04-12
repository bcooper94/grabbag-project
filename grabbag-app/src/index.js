import React from 'react';
import ReactDOM from 'react-dom';
import DevicePickerApp from './DevicePickerApp';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/index.css';

ReactDOM.render(<DevicePickerApp />, document.getElementById('root'));
registerServiceWorker();
