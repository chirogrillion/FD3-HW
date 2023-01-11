import React from 'react';
import PropTypes from 'prop-types';

import './Shop.css';

import Product from './Product';
import Sidebar from './Sidebar';

class Shop extends React.Component {

  static propTypes = {
    shopName: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.number.isRequired,
      imgURL: PropTypes.string.isRequired,
      description: PropTypes.string,
      inStock: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })),
  };

  state = {
    products: this.props.products,
    selectedProduct: null,
    sidebarMode: 'idle',
    buttonsDisabled: false,
  };

  productSelected = (c) => {
    if (this.state.selectedProduct === c) {
      this.setState({
        selectedProduct: null,
        sidebarMode: 'idle',
      });
    }
    else {
      this.setState({
        selectedProduct: c,
        sidebarMode: 'view',
      });
    }
  };

  editProduct = (c) => {
    this.setState({
      selectedProduct: c,
      sidebarMode: 'edit',
    });
  };

  addProduct = () => {
    this.setState({
      selectedProduct: null,
      sidebarMode: 'add',
    });
  };

  getNewProdCode = () => {
    const prodList = this.state.products;
    return prodList[prodList.length - 1].code + 1;
  };

  disableButtons = () => {
    this.setState({buttonsDisabled: true});
  };

  discardChanges = (c) => {
    if (c) {
      this.setState({
        selectedProduct: c,
        sidebarMode: 'view',
        buttonsDisabled: false,
      });
    }
    else {
      this.setState({
        selectedProduct: null,
        sidebarMode: 'idle',
        buttonsDisabled: false,
      });
    }
  };

  saveChanges = (p) => {
    const oldList = this.state.products;
    const existingProduct = oldList.findIndex(v => v.code === p.code);
    let newList = [...oldList];
    if (existingProduct !== -1) {
      newList.splice(existingProduct, 1, p);
    }
    else {
      newList.push(p);
    }
    console.log(oldList);
    console.log(newList);
    this.setState({
      products: newList,
      selectedProduct: p.code,
      sidebarMode: 'view',
      buttonsDisabled: false,
    });
  };

  deleteProduct = (c) => {

    const newList = this.state.products.filter(v => v.code !== c);

    if (this.state.selectedProduct === c) {
      this.setState({
        products: newList,
        selectedProduct: null,
        sidebarMode: 'idle',
      });
    }
    else {
      this.setState({products: newList});
    }

  };

  render() {

    const productsLayout = this.state.products.map(v =>
      <Product
        key={v.code}
        code={v.code}
        name={v.name}
        category={v.category}
        imgURL={v.imgURL}
        description={v.description}
        inStock={v.inStock}
        price={v.price}
        cbProductSelected={this.productSelected}
        isSelected={this.state.selectedProduct === v.code}
        cbEditProduct={this.editProduct}
        buttonsDisabled={this.state.buttonsDisabled}
        cbDeleteProduct={this.deleteProduct}
      />
    );

    const sidebarMode = this.state.sidebarMode;
    const selProdCode = this.state.selectedProduct;
    const selProd = selProdCode
      ? this.state.products.find(v => v.code === selProdCode)
      : null;

    return (
      <React.Fragment>
        <section className="Shop">
          <header>
            <h1>{this.props.shopName}</h1>
            <button
              className={this.state.buttonsDisabled ? 'button-disabled' : null}
              onClick={this.addProduct}
            >Добавить товар</button>
          </header>
          <main><table>
            <thead><tr>
              <th>Фото</th>
              <th>Название, описание</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>В&nbsp;наличии</th>
            </tr></thead>
            <tbody>
              {productsLayout}
            </tbody>
          </table></main>
        </section>
        <aside>{
          sidebarMode === 'idle'
            ? <p>Выберите товар из списка.</p>
            : <Sidebar
                mode={sidebarMode}
                prodCode={sidebarMode === 'add' ? this.getNewProdCode() : selProd.code}
                prodName={sidebarMode === 'add' ? '' : selProd.name}
                prodCtgr={sidebarMode === 'add' ? 0 : selProd.category}
                prodImgURL={sidebarMode === 'add' ? '' : selProd.imgURL}
                prodDescr={sidebarMode === 'add' ? '' : selProd.description}
                prodInStock={sidebarMode === 'add' ? -1 : selProd.inStock}
                prodPrice={sidebarMode === 'add' ? 0 : selProd.price}
                cbDisableButtons={this.disableButtons}
                cbDiscardChanges={this.discardChanges}
                cbSaveChanges={this.saveChanges}
              />
        }</aside>
      </React.Fragment>
    );

  };

};

export default Shop;