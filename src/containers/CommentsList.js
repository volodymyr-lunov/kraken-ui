import React, {useState, useEffect} from 'react';
import {API} from 'aws-amplify';
import {useDispatch, useSelector} from 'react-redux';
import {mapMap} from '../lib/utils';
import {loadedComments} from '../actions/comments';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';
import Comment from '../components/Comment';

const CommentsList = ({postId, parentId}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const {comments} = useSelector(state => ({comments: state.comments.get(postId)?.get(parentId || '') || new Map()}));

  const fetchComments = () => {
    setLoading(true);

    const url = `/posts/${postId}/comments` + (parentId ? `?parentId=${parentId}` : '');

    return API.get('api', url)
      .then(({comments}) => ({
        count: comments.Count,
        items: comments.Items,
        scannedCount: comments.ScannedCount
      }))
      .then((comments) => dispatch(loadedComments({postId, comments, parentId})))
      .catch(({response}) => setError(response.data.message))
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };

  useEffect(() => {
    if (!loading && !loaded && !comments.size) {
      fetchComments();
    }
  });

  if (error) return <ErrorMsg msg={error} />
  if (loading) return <Spinner />

  const content = comments.size 
    ? mapMap(comments, comment => <Comment data={comment} key={comment.id}/>)
    : <li><center><i>No Content</i></center></li>;

  return (
    <ul className={'comments-list'}>
      {content}
    </ul>
  )
};

export default CommentsList;