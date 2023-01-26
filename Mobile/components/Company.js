import React from 'react';
import PropTypes from 'prop-types';

import './Company.css';

import Client from './Client';
import { myEvents } from './events';

class Company extends React.PureComponent {

  static propTypes = {
    clients: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      patronym: PropTypes.string,
      balance: PropTypes.number.isRequired,
    })),
  };

  state = {
    clients: this.props.clients,
    activeTab: 'all',
    clientBeingEdited: null,
    newClientBeingAdded: null,
  };

  componentDidMount = () => {
    myEvents.addListener('clientDeletionRequested', this.deleteClient);
    myEvents.addListener('clientModeChangeRequested', this.changeClientMode);
    myEvents.addListener('clientInfoUpdateRequested', this.updateClientInfo);
  };

  componentWillUnmount = () => {
    myEvents.removeListener('clientDeletionRequested', this.deleteClient);
    myEvents.removeListener('clientModeChangeRequested', this.changeClientMode);
    myEvents.removeListener('clientInfoUpdateRequested', this.updateClientInfo);
  };

  switchTab = (eo) => {
    this.setState({activeTab: eo.target.value});
  };

  changeClientMode = (c) => {
    if (this.state.clientBeingEdited === c) {
      this.setState({clientBeingEdited: null});
    }
    else if (this.state.newClientBeingAdded === c) {
      this.setState({newClientBeingAdded: null});
    }
    else {
      this.setState({clientBeingEdited: c, newClientBeingAdded: null});
    }
  };

  updateClientInfo = (newInfo) => {
    const oldList = this.state.clients;
    let newList;
    if (this.state.clientBeingEdited) {
      newList = oldList.map(oldInfo =>
        oldInfo.code === newInfo.code ? newInfo : oldInfo
      );
    }
    else if (this.state.newClientBeingAdded) {
      newList = [...oldList, newInfo];
    }
    this.setState({clients: newList, clientBeingEdited: null, newClientBeingAdded: null});
  };

  getNewClientCode = () => {
    const clientsList = this.state.clients;
    const clientsNum = clientsList.length;
    if (!clientsNum) {
      return 100;
    }
    else {
      return clientsList[clientsNum - 1].code + 1;
    }
  };

  addClient = () => {
    this.setState({clientBeingEdited: null, newClientBeingAdded: this.getNewClientCode()});
  };

  getNewClientLayout = () => {
    const newClientCode = this.state.newClientBeingAdded;
    const newClient = {
      code: newClientCode,
      lastName: '',
      firstName: '',
      patronym: '',
      balance: 0,
    };
    return <Client
      key={newClientCode}
      mode="edit"
      content={newClient}
    />;
  };

  deleteClient = (c) => {
    const newList = this.state.clients.filter(v => v.code !== c);
    this.setState({clients: newList});
  };

  getClientsLayout = () => {

    let clientsList = [...this.state.clients];

    switch (this.state.activeTab) {
      case 'all':
        break;
      case 'active':
        clientsList = clientsList.filter(v => v.balance > 0);
        break;
      case 'blocked':
        clientsList = clientsList.filter(v => v.balance <= 0);
        break;
    }

    return clientsList.map(v =>
      <Client
        key={v.code}
        mode={v.code === this.state.clientBeingEdited ? 'edit' : 'view'}
        content={v}
      />
    );

  };

  render() {

    console.log(`Рендеринг Company`);

    return (
      <section className="Company">
        <header>
          <h2>Клиенты</h2>
          <button
            onClick={this.addClient}
          >Добавить клиента</button>
        </header>
        <main><table>
          <thead><tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Управление</th>
          </tr></thead>
          <tbody>
            {this.getClientsLayout()}
            {
              this.state.newClientBeingAdded
                ? this.getNewClientLayout()
                : null
            }
          </tbody>
        </table></main>
        <footer>
          <label className={this.state.activeTab === 'all' ? 'tab tab-active' : 'tab'}>
            <input
              type="radio"
              name="clients"
              value="all"
              checked={this.state.activeTab === 'all'}
              onChange={this.switchTab}
            />
            <h3>Все</h3>
          </label>
          <label className={this.state.activeTab === 'active' ? 'tab tab-active' : 'tab'}>
            <input
              type="radio"
              name="clients"
              value="active"
              checked={this.state.activeTab === 'active'}
              onChange={this.switchTab}
            />
            <h3>Активные</h3>
          </label>
          <label className={this.state.activeTab === 'blocked' ? 'tab tab-active' : 'tab'}>
            <input
              type="radio"
              name="clients"
              value="blocked"
              checked={this.state.activeTab === 'blocked'}
              onChange={this.switchTab}
            />
            <h3>Заблокированные</h3>
          </label>
        </footer>
      </section>
    );

  };

};

export default Company;