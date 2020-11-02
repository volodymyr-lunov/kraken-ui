import React from 'react';
import moment from 'moment';
import {Link as RouterLink} from 'react-router-dom';
import {useHistory} from 'react-router';
import {useAppContext} from '../lib/context';

const PREVIEW_CHARS = 255;

const prettyDate = (date) => date ? moment(date).fromNow() : '';
const previewCut = (content = '') => content.slice(0, PREVIEW_CHARS).concat('...').slice(0, content.length);

const Post = ({data = {}, preview = false}) => {
  const history = useHistory();
  const {authenticatedUser} = useAppContext();
  const author = authenticatedUser.id === data.createdBy;

  const deletePost = () => history.push(`/delete-post/${data.id}`);
  const editPost = () => history.push(`/edit-post/${data.id}`);

  const title = preview 
    ? (<h2><RouterLink to={`post/${data.id}`}>{data.title}</RouterLink></h2>) 
    : (<h1>{data.title}</h1>);

  const content = preview
    ? previewCut(data.body)
    : data.body;

  const actionPanel = author && !preview ? (
    <div className={'action-panel'}>
      <button className={'btn blue-btn'} onClick={editPost}>Edit</button>
      <button className={'btn red-btn'} onClick={deletePost}>Delete</button>
    </div>
  ) : '';

  return (
    <div key={data.id} className={'post-item'}>
      {title}
      {actionPanel}
      <p>{content}</p>
      <i className={'date'}>{prettyDate(data.updatedDate || data.createdDate)}</i>
    </div>
  )
}

export default Post;