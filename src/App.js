import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AppContext} from './lib/context';
import {Amplify, Auth} from 'aws-amplify';
import Menu from './containers/Menu';
import Content from './components/Content';
import Footer from './components/Footer';
import LoginButton from './components/LoginButton';
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
      endpoint: config.apiGateway.URL
    }]
  }
});

const App = () => {
  const [ isAuthenticated, userHasAuthenticated ] = useState(false);
  const [ isAuthenting, setIsAuthenting ] = useState(true);

  const onLoad = async () => {
    try {
      const user = await Auth.currentSession();
      userHasAuthenticated(true);
    } catch(err) {
      console.warn(err);
    }
    
    setIsAuthenting(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    !isAuthenting && 
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <BrowserRouter>
        <header className={'flex-container'}>
          <div className={'flex-item'}>
            <Menu />
          </div>
          <div className={'flex-item'}>
            <LoginButton />
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