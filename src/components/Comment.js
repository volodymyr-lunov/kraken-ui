import React, {useState} from 'react';
import moment from 'moment';
import CommentsForm from '../containers/CommentsForm';
import CommentsList from '../containers/CommentsList';

const prettyDate = (date) => date ? moment(date).fromNow() : '';

const Comment = ({data}) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleList, setToggleList] = useState(false);

  return (
    <div className={'comment'}>
      <p>{data.body}</p>
      <span className={'link'} onClick={() => setToggleForm(!toggleForm)}>Replay</span>&nbsp;&#8231;&nbsp;
      <i className={'date'}>{prettyDate(data.createdDate)}</i>&nbsp;&#8231;&nbsp;
      <span className={'link'} onClick={() => setToggleList(!toggleList)}>Replies &darr;</span>

      {toggleForm && <CommentsForm postId={data.postId} parentId={data.id} onCreated={() => {setToggleForm(false)} }/>}
      {toggleList && <CommentsList postId={data.postId} parentId={data.id} />}
    </div>
  )
}

export default Comment