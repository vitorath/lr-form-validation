import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import useForm from './hoc/useForm';

function App() {

  useEffect(() => {
    console.log('tetse')
  },[])

  const validate = (values) => {
    let errors = {};
    if (values.username.value === '') {
      errors.username = 'Username invalid!';
    }
    if (values.password.value === '') {
      errors.password = 'Password invalid!';
    }
    return errors;
  }

  const submitHandler = () => {
    console.log(errors);
  }

  const { values, errors, onChange, onSubmit } = useForm(
    submitHandler,
    {username: {
      value: '',
      valid: true,
    }, 
    password: {
      value: '',
      valid: true,
    }},
    validate,
    validate,
  );

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="text" name="username" value={values.username.value} placeholder="username" onChange={onChange}/>
        <input type="password" name="password" value={values.password.value} placeholder="password" onChange={onChange}/>
        <button type="submit">Salvar</button>
      </form>
      {console.log('errors',errors)}
      {console.log('values',values)}
    </div>
  );
}

export default App;
