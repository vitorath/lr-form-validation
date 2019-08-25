import { useState } from 'react';

export default (initialState = {}, canResetFields, callback) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    let currentValue = { ...values[event.target.name] }
    currentValue.value = event.target.value;
    if (currentValue.changeAttr) {
      currentValue = validateFieldMaxLengthChangeFilter(currentValue);
    }
    setValues({
      ...values,
      [event.target.name]: { ...currentValue },
    })
  };

  const onBlur = (event) => {
    let currentValue = { ...values[event.target.name] }
    currentValue = validateFields(currentValue);
    setValues({
      ...values,
      [event.target.name]: { ...currentValue },
    })
  }

  const resetFields = () => {
    if (canResetFields) {
      setValues(initialState);
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const fieldKeys = Object.keys(values);
    const hasErrors = hasNotInvalidFields(fieldKeys, values);
    console.log(hasErrors)
    if (!hasErrors) {
      callback();
      resetFields();
    }
  };

  return {
    onChange,
    onBlur,
    onSubmit,
    values,
    setValues,
  }

}

function hasNotInvalidFields(fieldKeys, values) {
  return fieldKeys.some(fieldKey => {
    const field = validateFields(values[fieldKey]);
    return field.error ? true : false;
  });
}

function validateFields(field) {
  if (field.required) {
    field = validateFieldRequiredFilter(field);
  }
  if (field.blurAttr) {
    field = validateFieldMinLengthBlurFilter(field);
  }
  return field;
}

function validateFieldRequiredFilter(field) {
  if (field.value.trim().length === 0) {
    field.error = true;
  } else {
    field.error = false;
  }
  return field;
}

function validateFieldMinLengthBlurFilter(field) {
  const ruleMinLength = field.blurAttr.minLength;
  if (ruleMinLength && ruleMinLength > field.value.trim().length) {
    field.error = true;
  } else {
    field.error = false;
  }
  return field;
}

function validateFieldMaxLengthChangeFilter(field) {
  const ruleMaxLength = field.changeAttr.maxLength;
  if (ruleMaxLength && ruleMaxLength <= field.value.trim().length) {
    field.value = field.value.slice(0, ruleMaxLength);
  }
  return field;
}
