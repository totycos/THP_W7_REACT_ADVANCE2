import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "React";
import Cookies from "js-cookie";

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const handleLike = () => {
    const tmp_likes = likes;
    setLikes((prev) => (post.is_liked ? prev - 1 : prev + 1));

    try {
      // increment like api call
    } catch (err) {
      setLikes(tmp_likes);
    }
  };
  return (
    <div>
      <h1>{post.author}</h1>
      <p>{post.content}</p>
      <div onClick={handleLike}>{likes} Likes</div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    likes: PropTypes.number,
    is_liked: PropTypes.boolean,
  }),
};

function PostsList({ posts }) {
  return (
    <div>
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
}

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:1337/api/posts?sort=createdAt:desc&populate=*",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Get post data failed. Please check your credentials and try again."
        );
      }

      const postData = await response.json();

      setPosts(postData);
    })();
  }, []);

  const handlePostCreated = useCallback((createdPost) => {
    setPosts((prev) => [createdPost, ...prev]);
  }, []);

  return (
    <div>
      <PostForm
        onPostCreated={handlePostCreated}
        onError={(err) => alert(err)}
      />
      <PostsList posts={posts} />
    </div>
  );
}

function PostForm({ onPostCreated, onError }) {
  const handleSubmit = (formData) => {
    try {
      // post create api call
      const createdPost = {
        author: "john",
        content: "salut",
        likes: 0,
        is_liked: false,
      };
      onPostCreated(createdPost);
    } catch (err) {
      onError(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <textfield />
    </form>
  );
}

PostForm.propTypes = {
  onPostCreated: PropTypes.function,
  onError: PropTypes.function,
};
