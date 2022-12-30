import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './Product.css';

class Product extends React.Component {

  static propTypes = {
    code: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    description: PropTypes.string,
    inStock: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    cbProductSelected: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    cbDeleteProduct: PropTypes.func.isRequired,
  };

  formatPrice = (num) => {
    return new Intl.NumberFormat('ru-BY', {style: 'currency', currency: 'BYN'}).format(num);
  };

  selectProduct = () => {
    this.props.cbProductSelected(this.props.code);
  };

  deleteProduct = (eo) => {
    eo.stopPropagation();
    const consentGiven = confirm(`Информация о товаре "${this.props.name}" будет удалена. Продолжить?`);
    if (consentGiven) {
      this.props.cbDeleteProduct(this.props.code);
    }
  };

  render() {

    const descr = this.props.description;

    return DOM.article(
      {
        className: this.props.isSelected
          ? 'Product selected'
          : 'Product',
        title: 'Нажмите, чтобы выделить; нажмите ещё раз, чтобы снять выделение',
        onClick: this.selectProduct,
      },
      DOM.img({src: this.props.photo}),
      DOM.div({className: 'Product-name'},
        DOM.h2(null, this.props.name),
        descr ? DOM.p(null, descr) : null,
      ),
      DOM.p({className: 'Product-category'}, this.props.category),
      DOM.p({className: 'Product-price'}, this.formatPrice(this.props.price)),
      DOM.p({className: 'Product-in_stock'},
        DOM.span(null, this.props.inStock),
      ),
      DOM.button({
        className: 'Product-delete_button',
        title: 'Удалить товар',
        onClick: this.deleteProduct,
      }, 'Удалить'),
    );

  };

};

export default Product;