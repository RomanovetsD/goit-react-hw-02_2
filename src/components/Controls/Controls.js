import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './Controls.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { msg } from '../../server/constants';

export default class Controls extends Component {
  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  handleValue = e => {
    const inputToNumber = Number(e.target.value);
    if (Number.isNaN(inputToNumber)) {
      toast.error(msg.amountMoney);
      return;
    }

    this.setState({ inputValue: inputToNumber });
  };

  handleChangeDeposit = () => {
    this.props.onDeposit(this.state.inputValue);
    this.reset();
  };

  handleChangeWithdrawl = () => {
    this.props.onWithdraw(this.state.inputValue);
    this.reset();
  };

  reset = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <section className={styles.controls}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={this.handleValue}
        />
        <button
          className={styles.button}
          type="button"
          onClick={(this.notify, this.handleChangeDeposit)}
        >
          Deposit
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={this.handleChangeWithdrawl}
        >
          Withdraw
        </button>
      </section>
    );
  }
}
