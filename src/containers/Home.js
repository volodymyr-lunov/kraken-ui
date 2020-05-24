import React, {useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {API} from 'aws-amplify';
import {loadedPosts, loadingPosts, loadingPostsError} from '../actions/posts';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const fetchPosts = ({limit=10, startFromId}, dispatch) => {
  dispatch(loadingPosts(true)); 

  const params = {limit};

  if (startFromId) {
    params['startFromId'] = startFromId;
  }

  return API.get('api', `/posts?${new URLSearchParams(params)}`)
    .then(({posts}) => {
      dispatch(loadingPosts(false));

      return {
        items: posts.Items,
        count: posts.Count,
        lastEvaluatedKey: posts.LastEvaluatedKey
      };
    })
    .then((posts) => dispatch(loadedPosts(posts)))
    .catch((err) => dispatch(loadingPostsError(err.message)));
};

const Home = () => {
  const {
    isLoading,
    items,
    lastEvaluatedKey,
    errorMsg
  } = useSelector(state => state.posts);

  const dispatch = useDispatch();

  const loadMore = () => {
    if (lastEvaluatedKey.id) {
      fetchPosts({startFromId: lastEvaluatedKey.id}, dispatch)
    }
  }

  useEffect(() => { 
    if (!items.length) {
      fetchPosts({}, dispatch)
    }
  }, []); // eslint-disable-line
  
  if (isLoading) return <Spinner />;
  if (errorMsg) return <ErrorMsg msg={errorMsg} />;
  if (!items.length) return <h3>No content</h3>

  const mayBeLoadMore = lastEvaluatedKey && lastEvaluatedKey.id;
  const loadMoreBtn = <button className={'btn'} onClick={loadMore}>Load More</button>;

  return (
    <Fragment>
      <div className={'posts-list'}>
        {items.map(post => (<Post data={post} isPreview={true} key={post.id} />))}
      </div>
      {mayBeLoadMore && loadMoreBtn}
    </Fragment>
  );
};

export default Home;