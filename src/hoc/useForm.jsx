import React, { useState } from 'react';

export default (callback, initialState = {}, submitValidate, changeValidate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onChange = (event) => { 
    const newValues = {
      ...values,
      [event.target.name]:{
        ...values[event.target.name],
        value: event.target.value
      }
    }
    setErrors(changeValidate(newValues));
    setValues(newValues);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(Object.keys(submitValidate(values)))
    if (Object.keys(submitValidate(values)).length === 0) {
      callback();
      setValues(initialState);
      setErrors({})
    } else {
      setErrors(submitValidate(values));
    }
  };

  return {
    onChange,
    onSubmit,
    errors,
    values,
  }

}