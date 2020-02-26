import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllPosts} from '../actions/posts';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

class Home extends Component {
  componentDidMount() {
    const {items} = this.props.posts;

    if (!items.length) {
      this.props.getAllPosts();
    }
  }

  loadMore() {
    const {lastEvaluatedKey} = this.props.posts;

    if (lastEvaluatedKey.id) {
      this.props.getAllPosts(10, lastEvaluatedKey.id);
    }
  }

  render() {
    const {
      posts: {
        items,
        isLoading,
        errorMsg,
        lastEvaluatedKey
      }
    } = this.props;

    const mayBeLoadMore = lastEvaluatedKey && lastEvaluatedKey.id;

    if (errorMsg) {
      return <ErrorMsg msg={errorMsg} />;
    }

    if (isLoading) {
      return <Spinner />;
    }

    if (items && items.length) {
      const list = (
        <div className={'posts-list'}>
          {items.map(item => (<Post item={item} isPreview={true} key={item.id} />))}
        </div>
      );

      const loadMoreBtn = <button className={'btn'} onClick={this.loadMore.bind(this)}>Load More</button>;

      return (
        <div>
          {list}
          {mayBeLoadMore && loadMoreBtn}
        </div>
      );
    }

    return (<h3>No content</h3>);
  }
}

const stateToProps = (state) => ({
  posts: state.posts
});

const dispatchToProps = (dispatch) => ({
  getAllPosts: (limit, startFromId) => dispatch(getAllPosts(limit, startFromId))
});

export default connect(
  stateToProps,
  dispatchToProps
)(Home);