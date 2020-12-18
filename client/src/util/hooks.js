import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();
    callback();
  };

  return {
    onInputChange,
    onSubmit,
    values
  }
};