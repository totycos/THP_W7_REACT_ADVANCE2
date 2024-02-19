import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userApi from "../../services/userApi";
import postApi from "../../services/postApi";
import Cookies from "js-cookie";
import "./index.scss";
import remove from "../../assets/remove.svg";

const Posts = () => {
  const { response, error, getUserDataFetch } = userApi();
  const {
    postResponse,
    postError,
    getPostsFetch,
    createPostFetch,
    deletePostFetch,
    likePostFetch,
  } = postApi();
  const [postData, setPostData] = useState("");
  const [userId, setUserId] = useState("");
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      await getUserDataFetch(Cookies.get("token"));
    };

    const getPosts = async () => {
      await getPostsFetch(Cookies.get("token"));
    };

    getUserData();
    getPosts();
  }, []);

  useEffect(() => {
    if (response && response.id) {
      setUserId(response.id);
    }
    error && console.log(error);
  }, [response, error]);

  useEffect(() => {
    postResponse && setPostData(postResponse);
    postError && console.log(postError);
  }, [postResponse, postError]);

  const handleSaveNewPost = () => {
    const createNewPost = async () => {
      await createPostFetch(Cookies.get("token"), newPost, userId);
    };
    createNewPost();

    const getPosts = async () => {
      await getPostsFetch(Cookies.get("token"));
    };
    getPosts();

    setNewPost("");
  };

  const handleRemovePost = async (postId) => {
    await deletePostFetch(Cookies.get("token"), postId);

    const getPosts = async () => {
      await getPostsFetch(Cookies.get("token"));
    };
    getPosts();
  };

  // HANDLE LIKES
  const handleLike = async (postId, like, users_likes) => {
    if (users_likes.includes(userId)) {
      like -= 1;
      const new_users_likes = users_likes.filter((id) => id !== userId);
      await likePostFetch(Cookies.get("token"), postId, like, new_users_likes);
    } else {
      like += 1;
      users_likes.push(userId);
      await likePostFetch(Cookies.get("token"), postId, like, users_likes);
    }

    const getPosts = async () => {
      await getPostsFetch(Cookies.get("token"));
    };
    getPosts();
  };

  return (
    <>
      <form className="postForm">
        <input
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

      <div className="postList">
        {postData &&
          postData.data &&
          Array.isArray(postData.data) &&
          postData.data.map((post) => (
            <div className="singlePost" key={post.id}>
              {userId === post.attributes.user.data.id && (
                <div
                  className="singlePost__remove"
                  onClick={() => handleRemovePost(post.id)}
                >
                  <img src={remove} alt="remove post" />
                </div>
              )}
              <p>
                <Link
                  className="singlePost__author"
                  to={`/user/${post.attributes.users_permissions_user.data.attributes.username}`}
                  state={{
                    description:
                      post.attributes.users_permissions_user.data.attributes
                        .description,
                    authorId: post.attributes.users_permissions_user.data.id,
                  }}
                >
                  {
                    post.attributes.users_permissions_user.data.attributes
                      .username
                  }
                </Link>
                <span className="singlePost__time">
                  {" "}
                  ·{" "}
                  {(
                    Math.abs(new Date() - new Date(post.attributes.createdAt)) /
                    36e5
                  ).toFixed(0)}
                  h
                </span>
              </p>

              <p className="singlePost__text">{post.attributes.text}</p>
              <p className="singlePost__like">
                <svg
                  onClick={() =>
                    handleLike(
                      post.id,
                      post.attributes.like,
                      post.attributes.users_likes.data.map((user) => user.id)
                    )
                  }
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#71767B"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill={
                        post.attributes.users_likes.data
                          .map((user) => user.id)
                          .includes(userId)
                          ? "#F91880"
                          : "none"
                      }
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                      stroke={
                        post.attributes.users_likes.data
                          .map((user) => user.id)
                          .includes(userId)
                          ? "#F91880"
                          : "#71767B"
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                  </g>
                </svg>{" "}
                {post.attributes.users_likes.data.length}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Posts;
