import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {mapMap} from '../lib/utils';
import {fetchComments} from '../actions/comments';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';
import Comment from '../components/Comment';

const CommentsList = ({postId, parentId}) => {
  const dispatch = useDispatch();
  const {comments, loading, error} = useSelector(({comments: { comments }}) => ({
    comments: comments.get(postId)?.get(parentId || '') || new Map()
  }));

  useEffect(() => {
    if (!comments.size) dispatch(fetchComments({postId, parentId}))
  }, [postId, parentId]); // eslint-disable-line

  if (error) return <ErrorMsg msg={error} />
  if (loading) return <Spinner />

  return (
    <ul className={'comments-list'}>
      {
        comments.size 
          ? mapMap(comments, comment => <Comment data={comment} key={comment.id}/>)
          : <li><center><i>No Content</i></center></li>
      }
    </ul>
  )
};

CommentsList.propTypes = {
  postId: PropTypes.string,
  parentId: PropTypes.string
};

export default CommentsList;