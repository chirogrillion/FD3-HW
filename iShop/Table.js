var Table = React.createClass({

  displayName: 'Table',

  propTypes: {
    shopName: React.PropTypes.string.isRequired,
    products: React.PropTypes.arrayOf(React.PropTypes.shape({
      code: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      category: React.PropTypes.string.isRequired,
      photo: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      inStock: React.PropTypes.number.isRequired,
      price: React.PropTypes.number.isRequired,
    })),
  },

  priceFormat: function(num) {
    return new Intl.NumberFormat('ru-BY',{style:'currency',currency:'BYN'}).format(num);
  },

  render: function() {
    var shopNameCode = React.DOM.h1({},this.props.shopName);
    var productsCode = this.props.products.map( v =>
      React.DOM.article( {key:v.code,className:'Product'},
        React.DOM.img({src:v.photo}),
        React.DOM.main({},
          React.DOM.h3({},v.category),
          React.DOM.h2({},v.name),
          React.DOM.p({className:'Product-Description'},v.description),
          React.DOM.p({className:'Product-In_Stock'},v.inStock),
        ),
        React.DOM.footer({},
          React.DOM.p({className:'Product-Price'},this.priceFormat(v.price)),
          React.DOM.button({className:'Product-Buy_Button'},'Купить'),
        ),
      )
    );
    return React.DOM.section({className:'Table'},shopNameCode,React.DOM.div({},productsCode));
  },

});