import React, {Fragment, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {useDispatch} from 'react-redux';
import {deletedPost} from '../actions/posts';
import {API} from 'aws-amplify';
import ErrorMsg from '../components/ErrorMsg';
import Spinner from '../components/Spinner';

const DeletePost = () => {
  const {postId} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deletePost = () => {
    setLoading(true);
    return API.del('api', `/posts/${postId}`, {response: false})
      .then(({post}) => {
        dispatch(deletedPost(postId))
        history.push('/home');
      })
      .catch(({response}) => setError(response.data.message));
  }

  const goBack = () => history.goBack();

  if (error) return <ErrorMsg msg={error} />
  if (loading) return <Spinner />

  return (
    <Fragment>
      <h3>Are you sure you want delete this post?</h3>
      <div className={'action-panel'}>
        <button className={'btn green-btn'} onClick={deletePost}>Yes</button>
        <button className={'btn red-btn'} onClick={goBack}>No</button>
      </div>
    </Fragment>
  );
}

export default DeletePost;