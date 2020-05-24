import React from 'react';
import moment from 'moment';
import {Link as RouterLink} from 'react-router-dom';
import {useHistory} from 'react-router';

const PREVIEW_CHARS = 255;

const prettyDate = (date) => date ? moment(date).fromNow() : '';
const previewCut = (content='') => content.slice(0, PREVIEW_CHARS).concat('...').slice(0, content.length);

const Post = ({data={}, isPreview=false}) => {
  const history = useHistory();

  const deletePost = () => {
    console.log(data.id)
  }

  const editPost = () => history.push(`/edit-post/${data.id}`);

  const title = isPreview 
    ? (<h2><RouterLink to={`post/${data.id}`}>{data.title}</RouterLink></h2>) 
    : (<h1>{data.title}</h1>);

  const content = isPreview
    ? previewCut(data.body)
    : data.body;

  const actionPanel = isPreview ? '' : (
    <div className={'action-panel'}>
      <button className={'btn blue-btn'} onClick={editPost}>Edit</button>
      <button className={'btn red-btn'} onClick={deletePost}>Delete</button>
    </div>
  );

  return (
    <div key={data.id} className={'post-item'}>
      {title}
      {actionPanel}
      <p>{content}</p>
      <i className={'date'}>{prettyDate(data.createdDate)}</i>
    </div>
  )
}

export default Post;