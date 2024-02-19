import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import postApi from "../../services/postApi";
import Cookies from "js-cookie";
import "./index.scss";

const OtherProfile = () => {
  const { postResponse, postError, getAuthorPostsFetch } = postApi();
  const { state } = useLocation(); // profile description in received state
  const { username } = useParams();
  const [postData, setPostData] = useState();

  useEffect(() => {
    const getAuthorPosts = async () => {
      await getAuthorPostsFetch(Cookies.get("token"), state.authorId);
    };

    getAuthorPosts();
  }, []);

  useEffect(() => {
    postResponse && setPostData(postResponse);
    postError && console.log(postError);
  }, [postResponse, postError]);

  return (
    <>
      <div className="containerTitle">
        <h1>{username} · Profile</h1>
      </div>
      <div className="otherProfile">
        <p className="otherProfile__username">{username}</p>
        <p className="otherProfile__description">{state.description}</p>
      </div>
      <div>
        {postResponse &&
          postResponse.data &&
          postResponse.data.map((post) => (
            <div className="otherProfilePosts" key={post.id}>
              <p className="otherProfilePosts__username">
                {username} ·{" "}
                <span className="otherProfilePosts__time">
                  {(
                    Math.abs(new Date() - new Date(post.attributes.createdAt)) /
                    36e5
                  ).toFixed(0)}
                  h
                </span>
              </p>
              <p className="otherProfilePosts__text">{post.attributes.text}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default OtherProfile;
