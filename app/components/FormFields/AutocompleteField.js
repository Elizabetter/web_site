import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextFormField from './TextFormField';

const AutocompleteField = ({
  errors,
  label,
  name,
  onBlur,
  onChange,
  required,
  value,
  options,
  ...other
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      id={name}
      options={options}
      renderInput={params => (
        <TextFormField
          {...params}
          errors={errors}
          name={name}
          label={label}
          required={required}
        />
      )}
      value={value}
      // defaultValue={englishLanguage}
      onChange={(event, newValue) => {
        // setValue(newValue);
        onChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      {...other}
    />
  );
};

AutocompleteField.propTypes = {
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
  label: PropTypes.node,
  // value, onChange, onBlur injects by react-hook-form
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default AutocompleteField;
