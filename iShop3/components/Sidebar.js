import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.css';

class Sidebar extends React.Component {

  static propTypes = {};

  render() {
    return (
      <section className="Sidebar">
        <header>
          <h1>Информация о товаре</h1>
        </header>
        <main></main>
        <footer></footer>
      </section>
    );
  };

};

export default Sidebar;