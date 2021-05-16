import React from 'react';
import PropTypes from 'prop-types';
import TextFormField from './TextFormField';

const NumberFormField = props => <TextFormField type="number" {...props} />;

NumberFormField.propTypes = {
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.node,
};

export default NumberFormField;
