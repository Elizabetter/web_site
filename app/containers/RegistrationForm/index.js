import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextFormField from '../../components/FormFields/TextFormField';
import { SaveButton } from '../../components/Buttons';
import FormActions from '../../components/FormActions';

const formFields = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  login: 'login',
  matchingPassword: 'matchingPassword',
};

const useStyles = makeStyles(() => ({
  error: {
    marginLeft: 10,
    color: 'red',
    fontSize: 13,
  },
}));

const schema = Yup.object().shape({
  [formFields.firstName]: Yup.string().required(),
  [formFields.lastName]: Yup.string().required(),
  [formFields.email]: Yup.string()
    .required()
    .email(),
  [formFields.password]: Yup.string()
    .min(6)
    .required(),
  [formFields.login]: Yup.string().required(),
  [formFields.matchingPassword]: Yup.string()
    .min(6)
    .required(),
});

const RegistrationForm = ({ onSubmit }) => {
  const { control, errors, formState, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  const sendOnlyModified = formData => {
    const { dirtyFields } = formState;
    const modifiedFields = Object.fromEntries(
      Object.keys(dirtyFields).map(dirtyFieldKey => [
        dirtyFieldKey,
        formData[dirtyFieldKey],
      ]),
    );
    onSubmit(modifiedFields);
  };

  const [matchingPasswordDisable, setMatchingPasswordDisable] = React.useState(
    true,
  );
  const passwordWatch = watch(formFields.password);
  const matchingPasswordWatch = watch(formFields.matchingPassword);
  useEffect(() => {
    const { dirtyFields } = formState;
    const check = passwordWatch === matchingPasswordWatch;
    if (
      dirtyFields[formFields.password] &&
      dirtyFields[formFields.matchingPassword] &&
      check
    ) {
      setMatchingPasswordDisable(true);
    }
    if (
      dirtyFields[formFields.password] &&
      dirtyFields[formFields.matchingPassword] &&
      !check
    ) {
      setMatchingPasswordDisable(false);
    }
  }, [passwordWatch, matchingPasswordWatch]);

  return (
    <form noValidate onSubmit={handleSubmit(sendOnlyModified)}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            name={formFields.lastName}
            label="Фамилия"
            required
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            name={formFields.firstName}
            label="Имя"
            required
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            name={formFields.email}
            label="Email"
            required
          />
        </Grid>

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

        <Grid item xs={12} md={12}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            type="password"
            name={formFields.matchingPassword}
            label="Подтверждение пароля"
            required
          />
          {!matchingPasswordDisable && (
            <div className={classes.error}>password does not match</div>
          )}
        </Grid>
        <Grid container>
          <FormActions>
            <SaveButton />
          </FormActions>
        </Grid>
      </Grid>
    </form>
  );
};

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
