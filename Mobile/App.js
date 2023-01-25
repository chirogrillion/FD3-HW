import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import Company from './components/Company';
const clientsArr = require('./clients.json');

ReactDOM.render(
  <Company clients={clientsArr}/>,
  document.getElementById('wrapper')
);