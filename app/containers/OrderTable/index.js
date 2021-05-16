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

const OrderTable = ({ products, handleClick, isSelected }) => {
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
                <FormattedMessage {...messages.id} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.address} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.price} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.number} />
              </TableTitle>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(row => {
              const { id, phoneNumber, address, price } = row;
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
                  <TableCell>{id}</TableCell>
                  <TableCell>{address}</TableCell>
                  <TableCell>{price} бел.руб.</TableCell>
                  <TableCell>{phoneNumber}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

OrderTable.propTypes = {
  products: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
};

export default OrderTable;
