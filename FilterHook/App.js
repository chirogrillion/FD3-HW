import React from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';
const wordsArr = require('./words.json');

ReactDOM.render(
  <Filter words={wordsArr}/>,
  document.getElementById('wrapper')
);