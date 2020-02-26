import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Menu from './containers/Menu';
import Content from './components/Content';
import Login from './containers/Login';
import Footer from "./components/Footer";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <header className={'flex-container'}>
          <div className={'flex-item'}>
            <Menu />
          </div>
          <div className={'flex-item'}>
            <Login />
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
    );
  }
}

export default App;