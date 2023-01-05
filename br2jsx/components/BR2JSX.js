import React from 'react';
import PropTypes from 'prop-types';

import './BR2JSX.css';

class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {

    let lines = this.props.text.split(/<br ?\/?>/);
    let layout = lines.map((v, i) => (
      [v, (i === lines.length - 1) ? null : <br key={i}/>]
    ));

    return <div className="BR2JSX">{layout}</div>

  };

};

export default BR2JSX;