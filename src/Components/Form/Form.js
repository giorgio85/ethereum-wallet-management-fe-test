import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import FormEntry from './FormEntry/FormEntry';
import '../../common.scss';

const Form = ({
  metadata,
  sendETH,
  updateInput,
  disableSendOption,
  isFromValid,
  fromValue,
}) => {
  return (
    <>
      {React.Children.toArray(metadata.map((entry) => (
        <FormEntry
          id={entry.id}
          type={entry.type}
          updateInput={updateInput}
          isFromValid={isFromValid}
          fromValue={fromValue}
        ></FormEntry>
      )))}
      <div className="form-options d-flex justify-content-end mt-4 p-3">
        <button
          className={disableSendOption ? 'disabled' : null}
          onClick={() => sendETH()}
        >
          Send
        </button>
      </div>
    </>
  );
};

Form.propTypes = {
  metadata: PropTypes.array,
  sendETH: PropTypes.func,
  updateInput: PropTypes.func,
  disableSendOption: PropTypes.bool,
  isFromValid: PropTypes.bool,
  fromValue: PropTypes.string,
};

export default React.memo(Form, isEqual);
