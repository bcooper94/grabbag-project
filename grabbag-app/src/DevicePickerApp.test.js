import React from 'react';
import ReactDOM from 'react-dom';
import DevicePicker from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DevicePicker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
