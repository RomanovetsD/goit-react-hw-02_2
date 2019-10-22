import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

const Controls = ({ onDeposit, onWithdraw }) => {
  return (
    <section className={styles.controls}>
      <input className={styles.input} type="number" name="amount" />
      <button className={styles.button} type="button" onClick={onDeposit}>
        Deposit
      </button>
      <button className={styles.button} type="button" onClick={onWithdraw}>
        Withdraw
      </button>
    </section>
  );
};

Controls.propTypes = {
  onDeposit: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
};

export default Controls;
