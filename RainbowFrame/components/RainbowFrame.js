import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string.isRequired),
  };

  render() {

    let layout = this.props.colors.reduce((r, v) => (
      <div className="frame" style={{borderColor: v}}>{r}</div>
    ), this.props.children);

    return <div className="RainbowFrame">{layout}</div>;

  };

};

export default RainbowFrame;