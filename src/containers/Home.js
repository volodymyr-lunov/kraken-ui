import React, {useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {mapMap} from '../lib/utils';
import {loadPosts} from '../actions/posts';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const Home = () => {
  const { items, lastEvaluatedKey, loading, error } = useSelector(state => state.posts);

  const dispatch = useDispatch();
  const loadMore = () => lastEvaluatedKey.id && loadPosts(lastEvaluatedKey.id)(dispatch);

  useEffect(() => { 
    dispatch(loadPosts());
  }, []); // eslint-disable-line
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMsg msg={error} />;
  if (!items.size) return <h3>No content</h3>

  const mayBeLoadMore = lastEvaluatedKey && lastEvaluatedKey.id;
  const loadMoreBtn = <button className={'btn'} onClick={(loadMore)}>Load More</button>;

  return (
    <Fragment>
      <div className={'posts-list'}>
        {mapMap(items, (post) => <Post data={post} preview={true} key={post.id} />)}
      </div>
      {mayBeLoadMore && loadMoreBtn}
    </Fragment>
  );
};

export default Home;