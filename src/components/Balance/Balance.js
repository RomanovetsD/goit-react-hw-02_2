import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => {
  return (
    <section className={styles.section}>
      <img
        src={require('../../img/green.png')}
        className={styles.greenArrow}
        alt="arrow_UP"
      />
      <p className={styles.income}>{income}.00$</p>
      <img
        src={require('../../img/red.png')}
        className={styles.redArrow}
        alt="arrow_DOWN"
      />
      <p className={styles.expenses}>{expenses}.00$</p>
      <p className={styles.balance}>Balance: {balance}.00$</p>
    </section>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default Balance;
