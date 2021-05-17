import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
import TextFormField from '../../components/FormFields/TextFormField';
import { SaveButton } from '../../components/Buttons';
import FormActions from '../../components/FormActions';
import ImageUpload from '../ImageUpload';
import NumberFormField from '../../components/FormFields/NumberFormField';

const formFields = {
  title: 'title',
  description: 'description',
  picture: 'picture',
  category: 'category',
  price: 'price',
  photo: 'photo',
};

const schema = Yup.object().shape({
  [formFields.title]: Yup.string().required(),
  [formFields.description]: Yup.string().required(),
  [formFields.category]: Yup.string().required(),
  [formFields.price]: Yup.number()
    .nullable()
    .required(),
});

const AddProductForm = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [array, setArray] = useState(null);
  // const file = new FormData(array);
  const sendOnlyModified = formData => {
    const { title, description, category, price } = formData;
    const photo = array;
    const final = [];
    final.push(photo, title, description, category, price);
    console.log(final);
    const formDataFile = new FormData();
    formDataFile.append('file', { final });
    console.log(array, formDataFile);
    const data = {
      photo,
      title,
      description,
      category,
      price,
    };
    onSubmit(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(sendOnlyModified)}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            name={formFields.title}
            label="Название"
            required
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            name={formFields.description}
            label="Описание"
            required
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Controller
            as={TextFormField}
            control={control}
            errors={errors}
            name={formFields.category}
            label="Категория"
            required
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Controller
            as={NumberFormField}
            control={control}
            errors={errors}
            name={formFields.price}
            label="Цена"
            required
          />
        </Grid>
        <ImageUpload cardName="Input Image" setArray={setArray} />
        <Grid container>
          <FormActions>
            <SaveButton />
          </FormActions>
        </Grid>
      </Grid>
    </form>
  );
};

AddProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddProductForm;
