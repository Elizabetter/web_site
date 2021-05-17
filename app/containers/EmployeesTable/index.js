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
import messages from '../Users/messages';
import { TableTitle } from '../TableTitle';
import CheckboxField from '../../components/FormFields/CheckboxField';
// eslint-disable-next-line import/no-cycle
import { useStyles } from '../Users/index';

const EmployeesTable = ({ employees, handleClick, isSelected }) => {
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
                <FormattedMessage {...messages.employee} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.login} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.email} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.role} />
              </TableTitle>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(row => {
              const { id, firstName, lastName, email, role, login } = row;
              const fullName = [lastName, firstName].join(' ');
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
                  <TableCell>{fullName}</TableCell>
                  <TableCell>{login}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{role}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

EmployeesTable.propTypes = {
  employees: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  deleteEmployees: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
};

export default EmployeesTable;
