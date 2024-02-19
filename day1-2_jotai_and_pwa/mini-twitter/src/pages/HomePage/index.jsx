import { useSelector } from "react-redux";
import Posts from "../../components/Posts";

const HomePage = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <>
      {isLogged ? (
        <Posts />
      ) : (
        <h3>
          Welcome on My Social Network. This website is a training to React,
          global state handling and tokens. Here, authentification and routing
          will be used to create a small social media website.
        </h3>
      )}
    </>
  );
};

export default HomePage;
