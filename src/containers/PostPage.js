import React, {useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loadPost} from '../actions/posts';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';
import CommentsList from './CommentsList';
import CommentsForm from './CommentsForm';

const PostPage = ({match}) => {
  const dispatch = useDispatch();
  const {postId} = match.params;
  const {post, error, loading} = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(loadPost(postId));
  }, []); // eslint-disable-line

  if (error) return <ErrorMsg msg={error} />;
  if (loading) return <Spinner />;
  if (post) {
    return (
      <Fragment>
        <Post data={post} />
        <CommentsForm postId={postId}/>
        <CommentsList postId={postId} />
      </Fragment>
    );
  }
  
  return <Spinner />;
}

export default PostPage;
