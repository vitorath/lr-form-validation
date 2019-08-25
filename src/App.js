import React, {useEffect,useState} from 'react';
import './App.css';

import useForm from './hoc/useForm';

const INITIAL_FORM_DATA = {
  name: {
    value: '',
    required: false,
    changeAttr: {
      maxLength: 5,
    },
  },
  username: {
    value: '',
    required: true,
    changeAttr: {
      maxLength: 30,
    },
  },
  password: {
    value: '',
    error: false,
    valid: false,
    required: true,
    changeAttr: {
      maxLength: 30,
    },
    blurAttr: {
      minLength: 7,
    },
  },
}

function App() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log('tetse')
  },[])

  const submitHandler = () => {
    console.log('values', values)
  }

  const { values, onChange, onBlur ,onSubmit, setValues } = useForm (
    INITIAL_FORM_DATA,
    false,
    submitHandler,
  );

  return (
    <div className="App">
      <h1>{process.env.REACT_APP_BASE}</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" value={values.name.value} placeholder="name" onChange={onChange}/>
        <input type="text" name="username" value={values.username.value} placeholder="username" onChange={onChange}/>
        <input type="password" name="password" value={values.password.value} placeholder="password" onChange={onChange} onBlur={onBlur}/>
        <button type="submit">Salvar</button>
        <button type="button" onClick={()=> {
          const key = count + 'value';
          setValues({
            ...values,
            [key]: 'NewValue' + count
          });
          setCount(count + 1);
        }}>Click</button>
      </form>
    </div>
  );
}

export default App;
