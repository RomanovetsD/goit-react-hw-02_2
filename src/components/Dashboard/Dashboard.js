/* import note-modules */
import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';

/* import component */
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

/* import CSS */
import styles from '../Controls/Controls.module.css';
import 'react-toastify/dist/ReactToastify.css';

/* Date now */
const dateFormat = require('dateformat');

const now = new Date();

/* Parent component container */
export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  /* Event handlers */
  handleChangeDeposit = e => {
    const amount = Number(e.target.parentElement.firstElementChild.value);
    if (amount === '' || amount > 0) {
      this.setState(({ transactions, balance }) => {
        const newAtempt = {
          type: 'deposit',
          id: shortid.generate(),
          amount,
          date: dateFormat(now, 'mm/dd/yyyy, HH:MM:ss'),
        };
        return {
          transactions: [...transactions, newAtempt],
          balance: balance + amount,
        };
      });
    } else {
      toast.info('Введите сумму для проведения операции!');
    }
  };

  handleChangeWithdrawl = e => {
    const amount = Number(e.target.parentElement.firstElementChild.value);

    if (amount <= 0) {
      toast.error('Некорректно введена сумма! Невозможно провести операцию!');
    } else if (amount <= this.state.balance) {
      const newAtempt = {
        type: 'withdrawal',
        id: shortid.generate(),
        amount,
        date: dateFormat(now, 'mm/dd/yyyy, HH:MM:ss'),
      };
      this.setState(({ transactions, balance }) => {
        return {
          transactions: [...transactions, newAtempt],
          balance: balance - amount,
        };
      });
    } else {
      toast.warn('На счету недостаточно средств для проведения операции!');
    }
  };

  render() {
    const { transactions, balance } = this.state;
    const deposit = [...transactions].reduce((acc, item) => {
      if (item.type === 'deposit') {
        return acc + item.amount;
      }
      return acc;
    }, 0);
    const withdrawal = [...transactions].reduce((acc, item) => {
      if (item.type === 'withdrawal') {
        return acc + item.amount;
      }
      return acc;
    }, 0);

    return (
      <div className={styles.dashboard}>
        <Controls
          onDeposit={this.handleChangeDeposit}
          onWithdraw={this.handleChangeWithdrawl}
        />
        <Balance balance={balance} income={deposit} expenses={withdrawal} />
        <TransactionHistory transactions={transactions} />
        <ToastContainer />
      </div>
    );
  }
}
