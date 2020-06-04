import React, {useEffect, Fragment, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {API} from 'aws-amplify';
import {mapMap} from '../lib/utils';
import {loadedPosts} from '../actions/posts';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const Home = () => {
  const {
    items,
    lastEvaluatedKey
  } = useSelector(state => state.posts);

  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPosts = (startFromId) => {
    setLoading(true);

    return API.get('api', '/posts' + (startFromId ? `?startFromId=${startFromId}` : ''))
      .then(({posts}) => ({
        items: posts.Items,
        count: posts.Count,
        lastEvaluatedKey: posts.LastEvaluatedKey
      }))
      .then((posts) => dispatch(loadedPosts(posts)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const loadMore = () => lastEvaluatedKey.id && fetchPosts(lastEvaluatedKey.id);

  useEffect(() => { 
    if (!items.size) fetchPosts();
  }, []); // eslint-disable-line
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMsg msg={error} />;
  if (!items.size) return <h3>No content</h3>

  const mayBeLoadMore = lastEvaluatedKey && lastEvaluatedKey.id;
  const loadMoreBtn = <button className={'btn'} onClick={loadMore}>Load More</button>;

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