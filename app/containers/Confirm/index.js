import React from 'react';
import { Dialog, DialogContent, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveButton } from '../../components/Buttons';
import TextFormField from '../../components/FormFields/TextFormField';
import FormActions from '../../components/FormActions';
import { create } from '../../dataProvider/API';
import CustomizedSnackbars from '../../components/Alert';
import { alertType } from '../../constants/api';
import { CONFIRM } from '../../constants/endpoints';

const formFields = {
  phoneNumber: 'phoneNumber',
  address: 'address',
};

const schema = Yup.object().shape({
  [formFields.phoneNumber]: Yup.string().required(),
  [formFields.address]: Yup.string().required(),
});

// eslint-disable-next-line react/prop-types
function Confirm({ children, id, accountId, amount }) {
  const { control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [showAlert, setShowAlert] = React.useState(false);

  const onSubmit = ({ ...params }) => {
    const { phoneNumber, address } = params;
    const data = {
      phoneNumber,
      address,
      id,
      accountId,
      amount,
    };
    create(CONFIRM, data)
      // eslint-disable-next-line no-unused-vars
      .then(r => {
        setShowAlert(true);
        setTimeout(function() {
          setShowAlert(false);
          handleClose();
        }, 5000);
      });
  };

  return (
    <div>
      {showAlert && (
        <CustomizedSnackbars
          message="Заказ оформлен!"
          status={alertType.SUCCESS}
        />
      )}
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Controller
                  as={TextFormField}
                  control={control}
                  errors={errors}
                  name={formFields.address}
                  label="Адрес"
                  required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  as={TextFormField}
                  control={control}
                  placeholder="+375(XX)-XXX-XX-XX"
                  errors={errors}
                  name={formFields.phoneNumber}
                  label="Номер телефона"
                />
              </Grid>
              <Grid container>
                <FormActions>
                  <SaveButton />
                </FormActions>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Confirm;
