import React from 'react';
import PropTypes from 'prop-types';

import './Client.css';

import { myEvents } from './events';

class Client extends React.PureComponent {

  static propTypes = {
    mode: PropTypes.string.isRequired,
    content: PropTypes.shape({
      code: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      patronym: PropTypes.string,
      balance: PropTypes.number.isRequired,
    }),
  };

  lastNameRef = React.createRef();
  firstNameRef = React.createRef();
  patronymRef = React.createRef();
  balanceRef = React.createRef();

  editClientInfo = () => {
    myEvents.emit('clientModeChangeRequested', this.props.content.code);
  };

  saveChanges = () => {

    const newLastName = this.lastNameRef.current.value;
    const newFirstName = this.firstNameRef.current.value;
    const newPatronym = this.patronymRef.current.value;
    const newBalance = Number(this.balanceRef.current.value);
    let newInfo;

    if (
      newLastName === this.props.content.lastName &&
      newFirstName === this.props.content.firstName &&
      newPatronym === this.props.content.patronym &&
      newBalance === this.props.content.balance
    ) {
      this.discardChanges();
    }
    else {
      newInfo = {
        ...this.props.content,
        lastName: newLastName,
        firstName: newFirstName,
        patronym: newPatronym,
        balance: newBalance,
      };
      myEvents.emit('clientInfoUpdateRequested', newInfo);
    }

  };

  discardChanges = () => {
    myEvents.emit('clientModeChangeRequested');
  };

  requestClientDeletion = () => {
    const consentGiven = confirm(`Информация о клиенте ${this.props.content.lastName} ${this.props.content.firstName}${this.props.content.patronym ? ' ' + this.props.content.patronym : ''} будет удалена. Продолжить?`);
    if (consentGiven) {
      myEvents.emit('clientDeletionRequested', this.props.content.code);
    }
  };

  getLayout = () => {
    switch (this.props.mode) {
      case 'view':
        return (
          <tr className={this.props.content.balance > 0 ? 'Client Client-active' : 'Client Client-blocked'}>
            <td>{this.props.content.lastName}</td>
            <td>{this.props.content.firstName}</td>
            <td>{this.props.content.patronym}</td>
            <td>{this.props.content.balance}</td>
            <td>{this.props.content.balance > 0 ? 'Активен' : 'Заблокирован'}</td>
            <td className="Client-controls">
              <button
                onClick={this.editClientInfo}
              >Редактировать</button>
              <button
                onClick={this.requestClientDeletion}
              >Удалить</button>
            </td>
          </tr>
        );
      case 'edit':
        return (
          <tr className="Client">
            <td>
              <input
                type="text"
                placeholder="Фамилия"
                defaultValue={this.props.content.lastName}
                ref={this.lastNameRef}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Имя"
                defaultValue={this.props.content.firstName}
                ref={this.firstNameRef}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Отчество"
                defaultValue={this.props.content.patronym}
                ref={this.patronymRef}
              />
            </td>
            <td>
              <input
                type="number"
                step="0.01"
                placeholder="Баланс"
                defaultValue={this.props.content.balance}
                ref={this.balanceRef}
              />
            </td>
            <td>Редактируется</td>
            <td className="Client-controls">
              <button
                onClick={this.saveChanges}
              >Сохранить</button>
              <button
                onClick={this.discardChanges}
              >Отменить</button>
            </td>
          </tr>
        );
    }
  };

  render() {
    console.log(`Рендеринг Client #${this.props.content.code}`);
    return this.getLayout();
  };

};

export default Client;