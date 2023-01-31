import React from 'react';

import './Filter.css';

import Controls from './Controls';
import List from './List';

const Filter = props => {

  console.log('Рендеринг Filter');

  return (
    <section className="Filter">
      <Controls/>
      <List words={props.words}/>
    </section>
  );

};

export default Filter;