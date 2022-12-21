let Filter = React.createClass({

  displayName: 'Filter',

  propTypes: {
    listItems: React.PropTypes.arrayOf(React.PropTypes.shape({
      code: React.PropTypes.number.isRequired,
      value: React.PropTypes.string.isRequired,
    })),
  },

  render: function() {

    let listCode = this.props.listItems.map(i =>
      React.DOM.li({key: i.code}, i.value)
    );

    return React.DOM.section({className: 'Filter'},
      React.DOM.div(null,
        React.DOM.input({type: 'text', placeholder: 'Введите что-нибудь...'}),
        React.DOM.button(null, 'Сбросить'),
      ),
      React.DOM.label(null,
        React.DOM.input({type: 'checkbox'}),
        React.DOM.span(null, 'Сортировать по алфавиту'),
      ),
      React.DOM.ul(null, listCode),
    );

  },

});