import React, {useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {mapMap} from '../lib/utils';
import {fetchPosts} from '../actions/posts';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const Home = () => {
  const {
    posts,
    lastEvaluatedKey,
    loading,
    error
  } = useSelector(state => state.posts);

  const dispatch = useDispatch();
  const loadMore = () => lastEvaluatedKey && dispatch(fetchPosts(lastEvaluatedKey));

  useEffect(() => {
    if (!posts.size) dispatch(fetchPosts());
  }, []); // eslint-disable-line
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMsg msg={error} />;
  if (!posts.size) return <h3>No content</h3>

  const mayBeLoadMore = lastEvaluatedKey && lastEvaluatedKey.id;
  const loadMoreBtn = <button className={'btn'} onClick={(loadMore)}>Load More</button>;

  return (
    <Fragment>
      <div className={'posts-list'}>
        {mapMap(posts, (post) => <Post data={post} preview={true} key={post.id} />)}
      </div>
      {mayBeLoadMore && loadMoreBtn}
    </Fragment>
  );
};

export default Home;