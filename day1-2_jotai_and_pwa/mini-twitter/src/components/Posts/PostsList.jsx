import Post from "./Post";
import PropTypes from "prop-types";

const PostsList = ({
  userId,
  token,
  postApi: { postResponse, getPostsFetch, deletePostFetch, likePostFetch },
}) => {
  return (
    <div className="postList">
      {postResponse &&
        postResponse.data &&
        Array.isArray(postResponse.data) &&
        postResponse.data.map((post) => (
          <Post
            post={post}
            userId={userId}
            deletePostFetch={deletePostFetch}
            getPostsFetch={getPostsFetch}
            likePostFetch={likePostFetch}
            token={token}
            key={post.id}
          />
        ))}
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number,
  setPostData: PropTypes.func,
  token: PropTypes.string,
  postApi: PropTypes.shape({
    postResponse: PropTypes.any,
    getPostsFetch: PropTypes.func,
    deletePostFetch: PropTypes.func,
    likePostFetch: PropTypes.func,
  }),
};

export default PostsList;
