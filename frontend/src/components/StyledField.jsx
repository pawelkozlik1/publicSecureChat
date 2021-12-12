import React from 'react';
import { CssTextField, textRegisteredStyles } from '../styling/fields';
import { Field } from 'formik';

const StyledField = ({ name, label, type = 'text'}) => {
  const classes = textRegisteredStyles();

  return (
    <Field
      className={classes.styled_field_editor}
      component={CssTextField}
      InputProps={{ className: classes.input_textfield }}
      name={name}
      type={type}
      InputLabelProps={{ className: classes.text_editor_label }}
      label={label}
    />
  );
};

export default StyledField;