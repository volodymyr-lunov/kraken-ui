import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AppContext} from './lib/context';
import {Amplify, Auth} from 'aws-amplify';
import Menu from './components/Menu';
import Content from './components/Content';
import Footer from './components/Footer';
import SignOptions from './components/SignOptions';
import config from './config';
import './App.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [{
      name: 'api',
      endpoint: config.apiGateway.URL,
      region: config.apiGateway.REGION
    }]
  }
});

const App = () => {
  const [ authenticatedUser, userHasAuthenticated ] = useState(false);
  const [ isAuthenting, setIsAuthenting ] = useState(true);

  useEffect(() => {
    Auth.currentSession()
      .then(({idToken: {payload}}) => {
        const user = {
          email: payload.email,
          id: payload['cognito:username']
        }

        return userHasAuthenticated(user)
      })
      .catch(err => console.warn(err))
      .then(() => setIsAuthenting(false));
  }, []);

  return (
    !isAuthenting && 
    <AppContext.Provider value={{ authenticatedUser, userHasAuthenticated }}>
      <BrowserRouter>
        <header className={'flex-container'}>
          <div className={'flex-item'}>
            <Menu />
          </div>
          <div className={'flex-item'}>
            <SignOptions />
          </div>
        </header>

        <div className={'flex-container'}>
          <div className={'flex-item side-panel'}>

          </div>
          <div className={'flex-item content'}>
            <Content/>
          </div>
        </div>

        <footer>
          <Footer/>
        </footer>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;