import Contacts from './components/Contacts';
import SignIn from './components/SignIn';
import Home from './containers/Home';
import PostPage from './containers/PostPage';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp';
import CreateEditPost from './containers/CreateEditPost';

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
  {path: '/home',               label: 'Home',          handler: Home},
  {path: '/contacts',           label: 'Contacts',      handler: Contacts},
  {path: '/create-post',        label: 'Create Post',   handler: CreateEditPost,  forAuthOnly: true},
  {path: '/edit-post/:postId',  label: 'Edit Post',     handler: CreateEditPost,  hidden: true},
  {path: '/post/:postId',       label: 'PostPage',      handler: PostPage,        hidden: true},
  {path: '/signin',             label: 'SignIn',        handler: SignIn,          hidden: true},
  {path: '/signout',            label: 'SignOut',       handler: SignOut,         hidden: true},
  {path: '/signup',             label: 'SignUp',        handler: SignUp,          hidden: true}
];

export default routes;