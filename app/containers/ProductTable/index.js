import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  TableCell,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { TableTitle } from '../TableTitle';
import CheckboxField from '../../components/FormFields/CheckboxField';
// eslint-disable-next-line import/no-cycle
import { useStyles } from '../Users/index';

const ProductTable = ({ products, handleClick, isSelected }) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper} elevation={2} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableTitle>
                <div />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.title} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.category} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.description} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.price} />
              </TableTitle>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(row => {
              const { id, title, description, category, price } = row;
              const isItemSelected = isSelected(id);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                  <TableCell
                    padding="checkbox"
                    onClick={event => handleClick(event, id)}
                  >
                    <CheckboxField
                      className={classes.checkbox}
                      checked={isItemSelected}
                    />
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{category}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>{price} бел.руб.</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
};

export default ProductTable;
