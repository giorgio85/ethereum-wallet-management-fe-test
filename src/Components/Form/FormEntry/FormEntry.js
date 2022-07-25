import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import './FormEntry.scss';

const FormEntry = ({ id, type, updateInput, isFromValid, fromValue }) => {
  const getInput = useCallback(() => {
    const isFromInvalid = id === 'from' && fromValue !== '' && !isFromValid;
    return (
      <>
        <input
          type={type}
          onChange={(value) => updateInput(id, value.currentTarget.value)}
          className={`${id}${isFromInvalid ? ' invalid' : ''}`}
        ></input>
        {isFromInvalid ? (
          <span>Please use an Ethereum address from your list.</span>
        ) : null}
      </>
    );
  }, [type, updateInput, id, isFromValid, fromValue]);

  return (
    <div className="form-entry d-flex flex-column">
      <label className="form-entry-id">{`${id
        .charAt(0)
        .toUpperCase()}${id.slice(1)}`}</label>
      <div className="form-entry-input">{getInput()}</div>
    </div>
  );
};

FormEntry.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  updateInput: PropTypes.func,
  isFromValid: PropTypes.bool,
  fromValue: PropTypes.string,
};

export default React.memo(FormEntry, isEqual);
