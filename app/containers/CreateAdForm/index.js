import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { FormActionsDisplay } from '../../components/FormActions';
import { CancelButton, SaveButton } from '../../components/Buttons';
import { routes } from '../../constants/routes';
import { Progress } from '../Progress';
import TextFormField from '../../components/FormFields/TextFormField';
import NumberFormField from '../../components/FormFields/NumberFormField';

const formFields = {
  topic: 'topic',
  content: 'content',
  city: 'city',
  phoneNumber: 'phoneNumber',
  price: 'price',
};

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object().shape({
  [formFields.topic]: Yup.string().required(),
  [formFields.content]: Yup.string()
    .nullable()
    .required(),
  [formFields.city]: Yup.string()
    .nullable()
    .required(),
  [formFields.phoneNumber]: Yup.string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required(),
  [formFields.price]: Yup.number()
    .nullable()
    .required(),
});

const CreateAdForm = ({ onSubmit, isSendingUserData }) => {
  const { control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            name={formFields.topic}
            label="Тема объявления"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            name={formFields.content}
            label="Описание товара"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            name={formFields.city}
            label="Город"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            as={TextFormField}
            control={control}
            placeholder="+375(XX)-XXX-XX-XX"
            errors={errors}
            name={formFields.phoneNumber}
            label="Номер телефона"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            as={NumberFormField}
            control={control}
            errors={errors}
            name={formFields.price}
            label="Цена"
          />
        </Grid>
      </Grid>
      <FormActionsDisplay>
        <CancelButton onClick={() => history.push(routes.MAIN)} />
        <Progress loading={isSendingUserData}>
          <SaveButton disabled={isSendingUserData} />
        </Progress>
      </FormActionsDisplay>
    </form>
  );
};

CreateAdForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSendingUserData: PropTypes.bool.isRequired,
};

export default CreateAdForm;
