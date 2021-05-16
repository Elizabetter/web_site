import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FormControl from '@material-ui/core/FormControl';
import { FormGroup, FormHelperText, FormLabel } from '@material-ui/core';
import CheckboxField from './CheckboxField';

const CheckboxGroupField = ({
  name,
  label,
  errors,
  options,
  onChange,
  required,
  defaultValues,
}) => {
  const error = get(errors, name)?.message;
  const hasError = Boolean(error);

  const [checkedValues, setCheckedValues] = useState(defaultValues);

  useEffect(() => {
    onChange(checkedValues);
  }, [checkedValues]);

  const onChangeCheckbox = checkedId => {
    const newIds = checkedValues?.includes(checkedId)
      ? checkedValues?.filter(selectedValue => selectedValue !== checkedId)
      : [...(checkedValues || []), checkedId];
    setCheckedValues(newIds);
  };

  return (
    <FormControl
      required={required}
      error={hasError}
      component="fieldset"
      margin="normal"
      row="true"
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup>
        {options.map(option => (
          <CheckboxField
            key={option.value}
            name={option.value}
            label={option.label}
            onChange={() => onChangeCheckbox(option.value)}
            value={checkedValues.includes(option.value)}
          />
        ))}
      </FormGroup>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

CheckboxGroupField.propTypes = {
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node,
    }),
  ),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  defaultValues: PropTypes.array,
};

CheckboxGroupField.defaultProps = {
  options: [],
  defaultValues: [],
};

export default CheckboxGroupField;
