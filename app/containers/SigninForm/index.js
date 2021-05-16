import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextFormField from '../../components/FormFields/TextFormField';
import { SaveButton } from '../../components/Buttons';
import FormActions from '../../components/FormActions';
const formFields = {
  password: 'password',
  login: 'login',
};

const useStyles = makeStyles(() => ({
  registration: {
    color: '#000000',
    marginLeft: 70,
  },
}));

const schema = Yup.object().shape({
  [formFields.password]: Yup.string()
    .min(6)
    .required(),
  [formFields.login]: Yup.string().required(),
});

const SignInForm = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  const sendOnlyModified = formData => {
    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(sendOnlyModified)}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Controller
              as={TextFormField}
              control={control}
              errors={errors}
              name={formFields.login}
              label="Логин"
              required
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              as={TextFormField}
              control={control}
              errors={errors}
              name={formFields.password}
              label="Пароль"
              type="password"
              required
            />
          </Grid>
          <Grid container>
            <FormActions>
              <SaveButton>Войти</SaveButton>
              <Link
                href="/registration"
                variant="body2"
                className={classes.registration}
              >
                {'Нет аккаунта? Зарегистрироваться.'}
              </Link>
            </FormActions>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
