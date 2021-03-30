import React, {useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPost, loadedPost} from '../actions/posts';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';
import CommentsList from './CommentsList';
import CommentsForm from './CommentsForm';

const PostPage = ({match}) => {
  const {postId} = match.params;
  const dispatch = useDispatch();
  const {currentPost, error, loading} = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(getPost(postId));

    return () => dispatch(loadedPost(null));
  }, []); // eslint-disable-line

  if (error) return <ErrorMsg msg={error} />;
  if (loading) return <Spinner />;
  if (currentPost) {
    return (
      <Fragment>
        <Post data={currentPost} />
        <CommentsForm postId={postId}/>
        <CommentsList postId={postId} />
      </Fragment>
    );
  }
  
  return <Spinner />;
}

export default PostPage;
