import React from 'react';
import moment from 'moment';

const prettyDate = (date) => date ? moment(date).fromNow() : '';

const Comment = ({data}) => {
  return (
    <div className={'comment'}>
      <p>{data.body}</p>
      <i className={'date'}>{prettyDate(data.createdDate)}</i>
    </div>
  )
}

export default Comment