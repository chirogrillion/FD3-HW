let Filter = React.createClass({

  displayName: 'Filter',

  propTypes: {
    listItems: React.PropTypes.arrayOf(React.PropTypes.shape({
      code: React.PropTypes.number.isRequired,
      value: React.PropTypes.string.isRequired,
    })),
  },

  getInitialState: function() {
    return {
      inputText: '',
      checkboxChecked: false,
      listItems: this.props.listItems,
    };
  },

  buttonClicked: function() {
    this.setState({inputText: '', checkboxChecked: false, listItems: this.props.listItems});
  },

  inputTextChanged: function(eo) {
    this.setState({inputText: eo.target.value}, this.filterListItems);
  },

  checkboxClicked: function(eo) {
    this.setState({checkboxChecked: eo.target.checked}, this.filterListItems);
  },

  filterListItems: function() {

    const inputText = this.state.inputText;
    const checkboxChecked = this.state.checkboxChecked;
    let listItemsArr = [...this.props.listItems];

    listItemsArr = inputText
      ? listItemsArr.filter(v => v.value.includes(inputText))
      : listItemsArr;

    listItemsArr = checkboxChecked
      ? listItemsArr.sort((a, b) => (a.value > b.value) ? 1 : -1)
      : listItemsArr;

    this.setState({listItems: listItemsArr});

  },

  render: function() {

    const listCode = this.state.listItems.map(v =>
      React.DOM.li({key: v.code}, v.value)
    );

    return React.DOM.section({className: 'Filter'},
      React.DOM.div(null,
        React.DOM.input({
          type: 'text',
          placeholder: 'Введите что-нибудь...',
          value: this.state.inputText,
          onChange: this.inputTextChanged,
        }),
        React.DOM.button({onClick: this.buttonClicked}, 'Сбросить'),
      ),
      React.DOM.label(null,
        React.DOM.input({
          type: 'checkbox',
          checked: this.state.checkboxChecked,
          onClick: this.checkboxClicked,
        }),
        React.DOM.span(null, 'Упорядочить по алфавиту'),
      ),
      React.DOM.ul({lang: 'en'}, listCode),
    );

  },

});