import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import Spinner from './Spinner';
import {useAppContext} from '../lib/context';
import {useFormFields} from '../lib/hooks';
import ErrorMsg from './ErrorMsg';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const {userHasAuthenticated} = useAppContext();
  const [{email, password}, fieldsHasChanged] = useFormFields({ email: '', password: '' });
  const errorMsg = error.length ? <ErrorMsg msg={error} /> : '';

  const validateForm = () => email.length && password.length;

  const submitUser = async () => {
    setLoading(true);

    Auth.signIn(email, password)
      .then(() => userHasAuthenticated(true))
      .catch(({response}) => setError(response.data.message))
      .then(() => {
        setLoading(false);
        history.push('/home');
      });
    };

  if (loading) return <Spinner/>

  return (
    <div className={'form-group'}>
      {errorMsg}
      <label>
        <input type="text" name="email" placeholder="Email" value={email} onChange={fieldsHasChanged} />
      </label>
      <label>
        <input type="password" name="password" placeholder="Password" value={password} onChange={fieldsHasChanged} />
      </label>
      <label>
        <button className={'btn blue-btn'} disabled={!validateForm()} onClick={submitUser}>Login</button>
      </label>
    </div>
  );
};

export default SignIn;