import Posts from "../../components/Posts";
import { useAtom } from "jotai";
import { isLoggedAtom } from "../../atoms/auth";

const HomePage = () => {
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);
  console.log("isLoggedAtom :", isLogged);
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
