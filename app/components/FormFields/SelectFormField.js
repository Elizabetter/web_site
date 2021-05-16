import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import get from 'lodash/get';

const SelectFormField = ({
  errors,
  label,
  name,
  onBlur,
  onChange,
  value,
  options,
  control,
  required,
  ...other
}) => {
  const error = get(errors, name)?.message;
  const hasError = Boolean(error);

  return (
    <FormControl
      required={required}
      error={hasError}
      fullWidth
      variant="outlined"
      margin="normal"
    >
      {label && (
        <InputLabel htmlFor={name} component="legend">
          {label}
        </InputLabel>
      )}

      <Select
        label={label}
        inputProps={{
          name,
          id: name,
        }}
        onChange={e => onChange(e.target.value)}
        value={value}
        {...other}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

SelectFormField.propTypes = {
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  control: PropTypes.object,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node,
    }),
  ),
  value: PropTypes.string,
  withSelectAll: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default SelectFormField;
