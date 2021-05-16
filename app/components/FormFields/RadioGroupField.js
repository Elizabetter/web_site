import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import get from 'lodash/get';

const RadioGroupField = ({
  name,
  label,
  errors,
  value,
  options,
  onChange,
  required,
}) => {
  const error = get(errors, name)?.message;
  const hasError = Boolean(error);

  return (
    <FormControl
      required={required}
      error={hasError}
      component="fieldset"
      margin="normal"
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup
        aria-label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="primary" />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

RadioGroupField.propTypes = {
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node,
    }),
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default RadioGroupField;
