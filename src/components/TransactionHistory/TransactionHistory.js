import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ transactions }) => {
  return (
    <table className={styles.transactionHistory}>
      <thead>
        <tr>
          <th className={styles.headingTable}>Transition</th>
          <th className={styles.headingTable}>Amount</th>
          <th className={styles.headingTable}>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(item => (
          <tr key={item.id} className={styles.tableRow}>
            <td className={styles.tableCells}>{item.type}</td>
            <td className={styles.tableCells}>{item.amount}$</td>
            <td className={styles.tableCells}>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TransactionHistory;
