import  React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AddressesManagement from './Pages/AddressesManagement/AddressesManagement';
import TransactionForm from './Pages/TransactionForm/TransactionForm';
import TransactionComplete from './Pages/TransactionComplete/TransactionComplete';

const addressesTest = {
  isSuccess: true,
  data: {
      result: [
        {
            account: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
            balance: "343270355903185816963191"
        },
        {
            account: "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
            balance: "40891626854930000000000"
        },
        {
            account: "0x63a9975ba31b0b9626b34300f7f627147df1f526",
            balance: "332567136222827062478"
        },
        {
            account: "0x198ef1ec325a96cc354c7266a038be8b5c558f67",
            balance: "0"
        }
    ]
  }
};

const apiResponse = {
  "status": "1",
  "message": "OK",
  "result": [
      {
          "account": "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
          "balance": "343270355903185816963191"
      },
      {
          "account": "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
          "balance": "40891626854930000000000"
      },
      {
          "account": "0x63a9975ba31b0b9626b34300f7f627147df1f526",
          "balance": "332567136222827062478"
      },
      {
          "account": "0x198ef1ec325a96cc354c7266a038be8b5c558f67",
          "balance": "0"
      }
  ]
};

const transactionCompleteInfo = {
  from: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
  to: "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
  amount: 1.04
}

const renderApp = () => {
  render(
    <Router>
      <React.StrictMode>
        <App addresses={addressesTest.result}
                  result={{isSuccess: true}}/>
      </React.StrictMode>
    </Router>,
  );
};

const renderAddressesManagement = (addresses, result) => {
  render(
    <Router>
      <AddressesManagement
        addresses={addresses}
        result={result}
      ></AddressesManagement>
    </Router>
  )
};

const renderTransactionForm = (addresses, updateTransactionInfo) => {
  render(
    <Router>
      <TransactionForm
      addresses={addresses}
      updateTransactionInfo={updateTransactionInfo}
      ></TransactionForm>
    </Router>
  )
};

const renderTransactionComplete = (transactionInfo) => {
  render(
    <Router>
      <TransactionComplete
        transactionInfo={transactionInfo}
      ></TransactionComplete>
    </Router>
  )
};
  
describe('Messages tests', () => {
  test('renders addresses management title', () => {
    renderApp();

    const addressesManagementTitle = screen.getByText('My Ethereum addresses');

    expect(addressesManagementTitle).toBeInTheDocument();
  });

  test('renders Waiting for yor addresses message', () => {
    renderApp();

    const waitMessage = screen.getByText('Waiting for yor addresses...');

    expect(waitMessage).toBeInTheDocument();
  });

  test('renders Ethereum addresses', () => {
    renderAddressesManagement(addressesTest.data.result, addressesTest);

    const copyMessage = screen.getByText('Please copy the address from which you wish to send money.');

    expect(copyMessage).toBeInTheDocument();
  });

  test('Ethereum addresses error', () => {
    renderAddressesManagement(addressesTest.data.result, {isLoading:false, isSuccess:false, isFailed:true});

    const failMessage = screen.getByText('Sorry, Something went wrong, please reload the web.');
    
    expect(failMessage).toBeInTheDocument();
  });
});

describe('Fetch test', () => {
  test('Check API call to etherscan', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(apiResponse) })
    );
    
    renderApp();
    await waitFor(() => screen.findByText('My Ethereum addresses'));
  
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.etherscan.io/api?module=account&action=balancemulti&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae,0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67&tag=latest&apikey=W8I5D1HT3M5GHDUTPBNE3VQCNRDT1T2PDT", {"body": undefined, "headers": {"Content-Type": "application/json", "accept": "application/json"}, "method": "GET"}
    );
  });
});

describe('Test Form Messages', () => {
  test('check transaction form screen with a valid from address', async () => {
    renderTransactionForm(addressesTest.data.result, ()=>{});

    const transactionFormTitle = screen.getByText('Please fill the form to send Ethereum');
    const addressesInputs = screen.getAllByRole('textbox');
    const amountInput = screen.getByRole('spinbutton');
    const fromInput = addressesInputs[0];
    const sendButton = screen.getByRole('button');
   
    fireEvent.change(fromInput, {
      target: { value: '0x198ef1ec325a96cc354c7266a038be8b5c558f67' },
    });
    const transactionFormError = screen.queryByText('Please use an Ethereum address from your list.');
    const toInput = addressesInputs[1];
    fireEvent.change(toInput, {
      target: { value: '0x63a9975ba31b0b9626b34300f7f627147df1f526' },
    });
    fireEvent.change(amountInput, { target: { value: '2.0383' } });
    fireEvent.click(sendButton);

    expect(transactionFormError).toBeNull();
    expect(transactionFormTitle).toBeInTheDocument();
  });

  test('check transaction form screen with a bon valid from address', async () => {
    renderTransactionForm(addressesTest.data.result, ()=>{});

    const transactionFormTitle = screen.getByText('Please fill the form to send Ethereum');
    const addressesInputs = screen.getAllByRole('textbox');
    const amountInput = screen.getByRole('spinbutton');
    const fromInput = addressesInputs[0];
    const sendButton = screen.getByRole('button');
   
    fireEvent.change(fromInput, {
      target: { value: '0x0000000000000000000000000000000000000000' },
    });
    const transactionFormError = screen.getByText('Please use an Ethereum address from your list.');
    const toInput = addressesInputs[1];
    fireEvent.change(toInput, {
      target: { value: '0x198ef1ec325a96cc354c7266a038be8b5c558f68' },
    });
    fireEvent.change(amountInput, { target: { value: '2.0383' } });
    fireEvent.click(sendButton);

    expect(transactionFormError).toBeInTheDocument();
    expect(transactionFormTitle).toBeInTheDocument();
  });
});

describe('Test Success Screen', () => {
  test('check transaction complete screen', async () => {
    renderTransactionComplete(transactionCompleteInfo);

    const transactionCompleteTitle = screen.getByText('Transaction complete');
    const youSentText = screen.getByText('You sent');
    const fromText = screen.getByText('From');
    const toText = screen.getByText('To');
    const fromAddress = screen.getByText(transactionCompleteInfo.from);
    const toAddress = screen.getByText(transactionCompleteInfo.to);
    const balance = screen.getByText(`${transactionCompleteInfo.amount} ETH`);
    
    expect(transactionCompleteTitle).toBeInTheDocument();
    expect(youSentText).toBeInTheDocument();
    expect(fromText).toBeInTheDocument();
    expect(toText).toBeInTheDocument();
    expect(fromAddress).toBeInTheDocument();
    expect(toAddress).toBeInTheDocument();
    expect(balance).toBeInTheDocument();
  });
});
