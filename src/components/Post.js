import React from 'react';
import moment from 'moment';
import {Link as RouterLink} from "react-router-dom";

const POST_PREVIEW_CHARS = 255;

const preview = (content='') => {
  if (content.length > POST_PREVIEW_CHARS) {
    return `${content.slice(0, POST_PREVIEW_CHARS)}...`;
  }

  return content;
};

const prettyDate = (date) => date ? moment(date).fromNow() : '';

const Post = ({item={}, isPreview=false}) => {
  const title = isPreview ?
    <h2>
      <RouterLink to={`post/${item.id}`}>
        {item.title}
      </RouterLink>
    </h2> :
    <h1>{item.title}</h1>;

  const content = isPreview ?
    preview(item.body) :
    item.body;

  return (
    <div key={item.id} className={'post-item'}>
      {title}
      <p>{content}</p>
      <i>{prettyDate(item.createdDate)}</i>
    </div>
    );
};

export default Post;