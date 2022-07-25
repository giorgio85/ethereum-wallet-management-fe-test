import isEqual from 'react-fast-compare';
import React, { useCallback, useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import logo from './utrust-logo.png';
import AddressesManagement from './Pages/AddressesManagement/AddressesManagement';
import useFetch from './Services/useFetch';
import TransactionForm from './Pages/TransactionForm/TransactionForm';
import TransactionComplete from './Pages/TransactionComplete/TransactionComplete';
import { useNavigate } from 'react-router-dom';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

const App = () => {
  const [state, setState] = useStateWithCallbackLazy({
    addresses: [],
    responseStatus: { isSuccess:false, isLoading: true, isFailed: false },
    transactionInfo: {
      from: '',
      to: '',
      amount: '',
    },
  });

  const [result, readWallet] = useFetch();

  useEffect(
    function () {
      readWallet({
        url: "https://api.etherscan.io/api?module=account&action=balancemulti&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae,0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67&tag=latest&apikey=W8I5D1HT3M5GHDUTPBNE3VQCNRDT1T2PDT",
        method: "GET"
      });
    },
    [readWallet]
  );

  if (result) {
    state.responseStatus = result;
    if (result.isSuccess && !state.addresses.length) {
      state.addresses = result.data.result;
      state.addresses.map((address => address.balance = (Math.random() * ((20.120 - 0.0200) + 0.0200)).toFixed(8)));
    }
  }
  const navigate = useNavigate();

  const updateTransactionInfo = useCallback(
    (from, to, amount) => {
      let addressesAux = [...state.addresses];
      addressesAux.find((address) => address.account === from).balance -= amount;

      let toWallet= addressesAux.find((address) => address.account === to);
      if (toWallet){
        toWallet.balance = parseFloat(amount) + parseFloat(toWallet.balance);
      }

      setState(
        {
          addresses: addressesAux,
          transactionInfo: { from: from, to: to, amount: amount },
        },
        () => navigate('/send/success', { replace: true })
      );
    },
    [setState, state, navigate]
  );

  return (
    <div className="App d-flex justify-content-center">
      <div className="align-self-center">
        <div className="header">
          <img
            src={logo}
            className="utrust-logo d-flex justify-content-start"
            alt="logo"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
            integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
            crossOrigin="anonymous"
          />
        </div>
        <div className="body">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <AddressesManagement
                  addresses={state.addresses}
                  result={state.responseStatus}
                ></AddressesManagement>
              }
            />
            <Route
              exact
              path="/send"
              element={
                <TransactionForm
                  addresses={state.addresses}
                  updateTransactionInfo={updateTransactionInfo}
                ></TransactionForm>
              }
            />
            <Route
              exact
              path="/send/success"
              element={
                <TransactionComplete
                  transactionInfo={state.transactionInfo}
                ></TransactionComplete>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );             
};

export default React.memo(App, isEqual);

