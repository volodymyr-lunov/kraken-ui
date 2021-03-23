import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AppContext} from './lib/context';
import {Amplify, Auth, API} from 'aws-amplify';
import awsExports from './aws-exports';
import Menu from './components/Menu';
import Content from './components/Content';
import Footer from './components/Footer';
import SignOptions from './components/SignOptions';
import config from './config';
import './App.css';

Amplify.configure(awsExports);
API.configure({
  Auth: {
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
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
      .then(({ idToken: { payload } }) => ({
        email: payload.email,
        id: payload['cognito:username']
      }))
      .then(user => userHasAuthenticated(user))
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
            side panel
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
};

export default App;