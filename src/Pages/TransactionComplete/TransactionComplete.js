import isEqual from 'react-fast-compare';
import React from 'react';
import PropTypes from 'prop-types';
import './TransactionComplete.scss';
import '../../common.scss';
import success_img from '../../success-sent.png';
import { useNavigate } from 'react-router-dom';

const TransactionComplete = ({ transactionInfo }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="header p-4">Transaction complete</div>
      <div className="body">
        <div className="d-flex justify-content-center">
          <img src={success_img} className="Success-img" alt="success-img" />
        </div>
        <div className="success-content d-flex flex-column">
          <label>You sent</label>
          <span className="amount">{`${transactionInfo.amount} ETH`}</span>
          <hr />
          <label>From</label>
          <span className="address pb-2">{transactionInfo.from}</span>
          <label>To</label>
          <span className="address">{transactionInfo.to}</span>
        </div>
      </div>
      <div className="addresses-footer d-flex justify-content-between p-3">
        <span>Go back to your wallet.</span>
        <button onClick={() => navigate('/', { replace: true })}>
          My Wallet
        </button>
      </div>
    </div>
  );
};

TransactionComplete.propTypes = {
  transactionInfo: PropTypes.object,
};

export default React.memo(TransactionComplete, isEqual);
