import isEqual from 'react-fast-compare';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './AddressesManagement.scss';
import '../../common.scss';
import copyToClipboard from '../../Utils/copyToClipboard';
import copy_icon from '../../copy-icon.svg';

const AddressesManagement = ({ addresses, result }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="header p-4">My Ethereum addresses</div>
      <div className="card-body p-0 body">
        {result.isSuccess && addresses && addresses.length > 0
          ?  React.Children.toArray(addresses.map(({account, balance}, index) => (
              <>
                <div className="row p-4">
                  <div className="col-auto address-account my-auto">{account}
                  </div>
                  <div className ="col-icon">
                    <img src={copy_icon} className="copy-icon" alt="copy" onClick={() => copyToClipboard(account)}/>
                  </div>
                  <div className="col address-quantity my-auto text-right pr-2">
                    <div className="row">
                      <b className="col address-amount pr-0">{balance}</b>
                      <div className="col-auto address-unit mt-1 pl-1">ETH</div>
                    </div>
                  </div>
                </div>
                {index + 1 < addresses.length ? <hr /> : null}
              </>
            )))
          : result.isLoading ? <>
              <div className="address d-flex justify-content-between p-4">
                <div className="address-account pr-2">Waiting for yor addresses...</div>
                <div className="address-quantity pl-2 d-flex flex-row">
                  <b className="address-amount">XXXX</b>
                  <div className="address-unit pl-1">ETH</div>
                </div>
              </div>
            </> : <>
              <div className="address d-flex justify-content-between p-4">
                <div className="address-account pr-2">Error while searching for your addresses...</div>
                <div className="address-quantity pl-2 d-flex flex-row">
                  <b className="address-amount">XXXX</b>
                  <div className="address-unit pl-1">ETH</div>
                </div>
              </div>
            </>
          }
      </div>
      <div className="addresses-footer d-flex justify-content-between p-3">
        {
          result.isLoading ?
            <span>Loading.... It can take few seconds....</span> :
              result.isSuccess ?
              <>
                <span>Please copy the address from which you wish to send money.</span>
                <button onClick={() => navigate('/send', { replace: true })}>
                  Next
                </button>
              </>
              : 
              <span>Sorry, Something went wrong, please reload the web.</span>
        }
      </div>
    </div>
  );
};

AddressesManagement.propTypes = {
  addresses: PropTypes.array,
};

export default React.memo(AddressesManagement, isEqual);
