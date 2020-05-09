import Contacts from './components/Contacts';
import About from './components/About';
import SignIn from './components/SignIn';

import Home from './containers/Home';
import PostPage from './containers/PostPage';
import SignOut from './components/SignOut';

/**
 * @typedef {Object} Route
 * @property {String} path
 * @property {String} label
 * @property {Function} handler
 * @property {Boolean} forAuthOnly
 * @property {Boolean} hideIfAuth
 * @property {Boolean} hidden
 * */
const routes = [
  {path: '/home',         label: 'Home',     handler: Home},
  {path: '/post/:postId', label: 'PostPage', handler: PostPage,     hidden: true},
  {path: '/contacts',     label: 'Contacts', handler: Contacts},
  {path: '/about',        label: 'About',    handler: About,        forAuthOnly: true},
  {path: '/Signin',       label: 'SignIn',   handler: SignIn,       hidden: true},
  {path: '/Signout',      label: 'SignOut',  handler: SignOut,      hidden: true}
];

export default routes;