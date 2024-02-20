import { useState, useEffect } from "react";
import CreatePostForm from "./CreatePostForm";
import PostsList from "./PostsList";
import userApi from "../../services/userApi";
import postApi from "../../services/postApi";
import Cookies from "js-cookie";
import "./index.scss";

const index = () => {
  const { response, error, getUserDataFetch } = userApi();
  const {
    postResponse,
    postError,
    getPostsFetch,
    createPostFetch,
    deletePostFetch,
    likePostFetch,
  } = postApi();
  const [userId, setUserId] = useState("");
  const token = Cookies.get("token") || null;

  // SET USER DATA
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

  // SET USER ID
  useEffect(() => {
    if (response && response.id) {
      setUserId(response.id);
    }
    error && console.log(error);
  }, [response, error]);

  // SET POST ERROR
  useEffect(() => {
    postError && console.log(postError);
  }, [postError]);

  return (
    <div className="postContainer">
      <CreatePostForm
        postApi={{
          getPostsFetch,
          createPostFetch,
        }}
        userId={userId}
        token={token}
      />
      <PostsList
        userId={userId}
        postApi={{
          postResponse,
          getPostsFetch,
          deletePostFetch,
          likePostFetch,
        }}
        token={token}
      />
    </div>
  );
};

export default index;
