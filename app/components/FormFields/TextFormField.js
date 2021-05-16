import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import get from 'lodash/get';

const TextFormField = ({ errors, name, value, ...other }) => {
  const error = get(errors, name)?.message;
  const hasError = Boolean(error);

  const fieldValue = value === null ? '' : value;

  return (
    <TextField
      id={name}
      autoComplete={name}
      name={name}
      variant="outlined"
      margin="normal"
      fullWidth
      error={hasError}
      helperText={error}
      value={fieldValue}
      {...other}
    />
  );
};

TextFormField.propTypes = {
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.node,
};

export default TextFormField;
