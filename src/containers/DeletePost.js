import React, {Fragment} from 'react';
import {useHistory, useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {deletePost} from '../actions/posts';
import ErrorMsg from '../components/ErrorMsg';
import Spinner from '../components/Spinner';

const DeletePost = () => {
  const {postId} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.posts);
  const no = () => history.push(`/post/${postId}`);
  const yes = () => dispatch(deletePost(postId)).then(history.push('/home'));

  if (error) return <ErrorMsg msg={error} />
  if (loading) return <Spinner />

  return (
    <Fragment>
      <h3>Are you sure you want delete this post?</h3>
      <div className={'action-panel'}>
        <button className={'btn green-btn'} onClick={yes}>Yes</button>
        <button className={'btn red-btn'} onClick={no}>No</button>
      </div>
    </Fragment>
  );
}

export default DeletePost;