import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import get from 'lodash/get';

function CheckboxField({ errors, name, label, onChange, value, ...other }) {
  const error = get(errors, name)?.message;
  // eslint-disable-next-line no-unused-vars
  const hasError = Boolean(error);

  return (
    <FormControlLabel
      control={
        <Checkbox
          // checked={state.checkedB}
          // onChange={handleChange}
          onChange={e => onChange(e.target.checked)}
          name={name}
          color="primary"
          checked={value}
          {...other}
        />
      }
      label={label}
    />
  );
}

CheckboxField.propTypes = {
  errors: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  label: PropTypes.node,
};

export default CheckboxField;
