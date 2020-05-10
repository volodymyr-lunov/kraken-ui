import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {useHistory} from 'react-router-dom';
import {useFormFields} from '../lib/hooks';
import {useAppContext} from '../lib/context';
import Spinner from './Spinner';

const SignUp = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const {userHasAuthenticated} = useAppContext();
  const [error, setError] = useState('');
  const [{email, password, confirmPassword, confirmationCode}, fieldsHasChanged] = useFormFields({
    email: '', 
    password: '', 
    confirmPassword: '',
    confirmationCode: ''
  });

  const validateRegistrForm = () => email.length && password.length && password === confirmPassword;
  const validateConfirmForm = () => confirmationCode > 0;

  const submitUser = () => {
    setIsLoading(true);
    Auth.signUp({ username: email, password })
      .then(newUser => setNewUser(newUser))
      .catch(err => setError(err.message))
      .then(() => setIsLoading(false));
  };

  const confirmRegistration = () => {
    setIsLoading(true);
    Auth.confirmSignUp(email, confirmationCode)
      .then(() => Auth.signIn(email, password))
      .then(() => {
        setIsLoading(false);
        userHasAuthenticated(true);
        history.push('home');
      })
      .catch(err => setError(err.message));
  };

  const registerForm = () => (
    <div className={'form-group'}>
      {errorMsg}
      <label>
        <input type="text" name="email" placeholder="Email" value={email} onChange={fieldsHasChanged} />
      </label>
      <label>
        <input type="password" name="password" placeholder="Password" value={password} onChange={fieldsHasChanged} />
      </label>
      <label>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={fieldsHasChanged} />
      </label>
      <label>
        <button className={'btn blue-btn'} disabled={!validateRegistrForm()} onClick={submitUser}>Register</button>
      </label>
    </div>
  );

  const confirmForm = () => (
    <div className={'form-group'}>
      {errorMsg}
      <label>
        <input type="number" name="confirmationCode" placeholder="Confirmation Code" value={confirmationCode} onChange={fieldsHasChanged} />
      </label>
      <label>
        <button className={'btn blue-btn'} disabled={!validateConfirmForm()} onClick={confirmRegistration}>Confirm</button>
      </label>
    </div>
  );

  const errorMsg = error.length ? <i className={'error'}>{error}</i> : '';

  if (isLoading) {
    return <Spinner/>
  }

  return newUser ? confirmForm() : registerForm();
}

export default SignUp;