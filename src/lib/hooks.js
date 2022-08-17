import {useState} from 'react';

export const useFormFields = (initialState) => {
  const [fields, setValues] = useState(initialState);

  const dispatch = (event) => {
    setValues({
      ...fields,
      [event.target.name]: event.target.value
    });
  }

  return [fields, dispatch];
}