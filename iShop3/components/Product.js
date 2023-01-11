import React from 'react';
import PropTypes from 'prop-types';

import categories from '../categories.json';

import './Product.css';

class Product extends React.Component {

  static propTypes = {
    code: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.number.isRequired,
    imgURL: PropTypes.string.isRequired,
    description: PropTypes.string,
    inStock: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    cbProductSelected: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    cbEditProduct: PropTypes.func.isRequired,
    buttonsDisabled: PropTypes.bool.isRequired,
    cbDeleteProduct: PropTypes.func.isRequired,
  };

  formatCategory = (num) => {
    return categories[num];
  };

  formatPrice = (num) => {
    return new Intl.NumberFormat('ru-BY', {style: 'currency', currency: 'BYN'}).format(num);
  };

  selectProduct = () => {
    if (!this.props.buttonsDisabled) {
      this.props.cbProductSelected(this.props.code);
    }
  };

  editProduct = (eo) => {
    eo.stopPropagation();
    this.props.cbEditProduct(this.props.code);
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

    return (
      <tr
        className={this.props.isSelected ? 'Product selected' : 'Product'}
        onClick={this.selectProduct}
      >
        <td className="Product-photo"><img src={this.props.imgURL}/></td>
        <td className="Product-name">
          <h1>{this.props.name}</h1>
          {descr ? <p>{descr}</p> : null}
        </td>
        <td className="Product-category">{this.formatCategory(this.props.category)}</td>
        <td className="Product-price">{this.formatPrice(this.props.price)}</td>
        <td className="Product-in_stock">{this.props.inStock}</td>
        <td className="Product-controls">
          <button
            className={this.props.buttonsDisabled ? 'button-disabled' : null}
            onClick={this.editProduct}
          >Редактировать</button>
          <button
            className={this.props.buttonsDisabled ? 'button-destr button-disabled' : 'button-destr'}
            onClick={this.deleteProduct}
          >Удалить</button>
        </td>
      </tr>
    );

  };

};

export default Product;