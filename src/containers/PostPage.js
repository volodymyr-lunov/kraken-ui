import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOnePost} from '../actions/post';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

class PostPage extends Component {
  componentDidMount() {
    const {postId} = this.props.match.params;

    this.props.getOnePost(postId);
  }

  render() {
    const {
      post: {
        currentPost,
        isLoading,
        errorMsg
      }
    } = this.props;

    if (errorMsg) {
      return <ErrorMsg msg={errorMsg} />;
    }

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <div>
        <Post item={currentPost} isPreview={false} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post
});

const mapDispatchToProps = (dispatch) => ({
  getOnePost: (id) => dispatch(getOnePost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);

