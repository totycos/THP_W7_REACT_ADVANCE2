import PropTypes from "prop-types";
import { useState } from "react";

const CreatePostForm = ({
  postApi: { getPostsFetch, createPostFetch },
  userId,
  token,
}) => {
  const [newPost, setNewPost] = useState("");

  // HANDLE SAVE NEW POST
  const handleSaveNewPost = () => {
    const createNewPost = async () => {
      await createPostFetch(token, newPost, userId);
    };
    createNewPost();

    const getPosts = async () => {
      await getPostsFetch(token);
    };
    getPosts();

    setNewPost("");
  };

  return (
    <form className="postForm">
      <textarea
        type="post"
        value={newPost}
        placeholder="What's up ?!"
        onChange={(e) => setNewPost(e.target.value)}
        required
      />

      <div>
        <button type="button" onClick={handleSaveNewPost}>
          Post
        </button>
      </div>
    </form>
  );
};

CreatePostForm.propTypes = {
  userData: PropTypes.shape({
    response: PropTypes.any,
    error: PropTypes.any,
    getUserDataFetch: PropTypes.func,
  }),
  postApi: PropTypes.shape({
    postResponse: PropTypes.any,
    postError: PropTypes.any,
    getPostsFetch: PropTypes.func,
    createPostFetch: PropTypes.func,
    deletePostFetch: PropTypes.func,
    likePostFetch: PropTypes.func,
  }),
  userId: PropTypes.number,
  token: PropTypes.string,
};

export default CreatePostForm;
