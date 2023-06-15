import { TextField, Grid } from '@mui/material';
import React, {ChangeEventHandler, HTMLInputTypeAttribute} from 'react';

interface Props {
  value: string;
  label: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute | 'select';
  required?: boolean;
  error?: string;
  id?: string;
}

const FormElement = (
  {
    name,
    label,
    value,
    onChange,
    type = 'text',
    required = false,
    error,
    id,
  }: Props,
) => {
  return (
    <Grid item xs={12}>
      <TextField
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        name={name}
        variant="outlined"
        fullWidth
        label={label}
        error={!!error}
        helperText={error}
      />
    </Grid>
  );
};

export default FormElement;