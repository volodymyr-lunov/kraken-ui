import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import Spinner from './Spinner';
import {useAppContext} from '../lib/context';
import {useFormFields} from '../lib/hooks';

const SignIn = () => {
  const [{email, password}, fieldsHasChanged] = useFormFields({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const {userHasAuthenticated} = useAppContext();

  const validateForm = () => email.length && password.length;

  const submitUser = async () => {
    setIsLoading(true);

    Auth.signIn(email, password)
      .then(() => userHasAuthenticated(true))
      .catch(err => setError(err.message))
      .then(() => {
        setIsLoading(false);
        history.push('home');
      });
    };

  const errorMsg = error.length ? <i className={'error'}>{error}</i> : '';

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <div className={'form-group'}>
      {errorMsg}
      <label>
        <input 
          type="text" 
          name="email" 
          placeholder="Email" 
          value={email} 
          onChange={fieldsHasChanged} 
        />
      </label>
      <label>
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={password} 
          onChange={fieldsHasChanged} 
        />
      </label>
      <label>
        <button className={'btn blue-btn'} disabled={!validateForm()} onClick={submitUser}>Login</button>
      </label>
    </div>
  );
};

export default SignIn;