import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {useHistory} from 'react-router-dom';
import {useFormFields} from '../lib/hooks';
import {useAppContext} from '../lib/context';
import Spinner from './Spinner';
import ErrorMsg from './ErrorMsg';

const SignUp = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const {userHasAuthenticated} = useAppContext();
  const [error, setError] = useState('');
  const errorMsg = error.length ? <ErrorMsg msg={error} /> : '';
  const [{email, password, confirmPassword, confirmationCode}, fieldsHasChanged] = useFormFields({
    email: '', 
    password: '', 
    confirmPassword: '',
    confirmationCode: ''
  });

  const validateRegistrForm = () => email.length && password.length && password === confirmPassword;
  const validateConfirmForm = () => confirmationCode > 0;

  const submitUser = () => {
    setLoading(true);
    Auth.signUp({ username: email, password })
      .then(newUser => setNewUser(newUser))
      .catch(({response}) => setError(response.data.message))
      .then(() => setLoading(false));
  };

  const confirmRegistration = () => {
    setLoading(true);
    Auth.confirmSignUp(email, confirmationCode)
      .then(() => Auth.signIn(email, password))
      .then(() => {
        setLoading(false);
        userHasAuthenticated(true);
        history.push('home');
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
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

  if (loading) return <Spinner/>

  return newUser 
    ? confirmForm() 
    : registerForm();
}

export default SignUp;