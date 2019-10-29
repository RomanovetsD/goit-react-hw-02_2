/* Core */
import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import storage from '../../services/stotage';

/* Components */
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

/* Instruments */
import styles from '../Controls/Controls.module.css';
import 'react-toastify/dist/ReactToastify.css';

/* Server */
import {
  WITHDROWL,
  DEPOSIT,
  msg,
  DATA_FORMAT,
  TRANSACTIONS,
  BALANCE,
} from '../../server/constants';

/* Date now */
const dateFormat = require('dateformat');

const now = new Date();

/* Parent component container */
export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  /* Lifecycle Phase: Mount */
  componentDidMount() {
    const transactions = storage.get(TRANSACTIONS);
    const balance = storage.get(BALANCE);

    if (transactions && balance >= 0) {
      this.setState({ transactions, balance });
    }
  }

  /* Lifecycle Phase: Update */
  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;

    if (
      prevState.transactions !== transactions &&
      prevState.balance !== balance
    ) {
      storage.save('transactions', transactions);
      storage.save('balance', balance);
    }
  }

  /* Event handlers */
  handleChangeDeposit = amount => {
    if (amount === '' || amount > 0) {
      this.setState(({ transactions, balance }) => {
        const newAtempt = {
          type: DEPOSIT,
          id: shortid.generate(),
          amount,
          date: dateFormat(now, DATA_FORMAT),
        };
        return {
          transactions: [...transactions, newAtempt],
          balance: balance + amount,
        };
      });
    } else {
      toast.info(msg.amountMoney);
    }
  };

  handleChangeWithdrawl = amount => {
    if (amount <= 0) {
      toast.error(msg.tryAgain);
    } else if (amount <= this.state.balance) {
      const newAtempt = {
        type: WITHDROWL,
        id: shortid.generate(),
        amount,
        date: dateFormat(now, DATA_FORMAT),
      };
      this.setState(({ transactions, balance }) => {
        return {
          transactions: [...transactions, newAtempt],
          balance: balance - amount,
        };
      });
    } else {
      toast.warn(msg.notEnoughMoney);
    }
  };

  render() {
    const { transactions, balance } = this.state;
    const deposit = [...transactions].reduce((acc, item) => {
      if (item.type === DEPOSIT) {
        return acc + item.amount;
      }
      return acc;
    }, 0);
    const withdrawal = [...transactions].reduce((acc, item) => {
      if (item.type === WITHDROWL) {
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
