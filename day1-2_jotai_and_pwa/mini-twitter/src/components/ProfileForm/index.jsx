import { useState, useEffect } from "react";
import userApi from "../../services/userApi";
import Cookies from "js-cookie";
import "./index.scss";

const ProfileForm = () => {
  const { response, error, getUserDataFetch, updateUserDataFetch } = userApi();
  const [username, setUsername] = useState(
    response && response.username ? response.username : ""
  );
  const [description, setDescription] = useState(
    response && response.description ? response.description : ""
  );
  const [userId, setUserId] = useState(
    response && response.id ? response.id : ""
  );

  useEffect(() => {
    const getUserDataCallApi = async () => {
      await getUserDataFetch(Cookies.get("token"));
    };
    getUserDataCallApi();
  }, []);

  useEffect(() => {
    response && response.username && setUsername(response.username);
    response && response.description && setDescription(response.description);
    response && response.id && setUserId(response.id);
    error && console.log(error);
  }, [response, error]);

  const handleSaveChanges = async () => {
    await updateUserDataFetch(
      Cookies.get("token"),
      username,
      description,
      userId
    );
  };

  return (
    <>
      <div className="containerTitle">
        <h1>{username} · Profile</h1>
      </div>
      <form className="profileForm">
        <input
          className="profileForm__username"
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <textarea
          className="profileForm__description"
          type="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="profileForm__containerButton">
          <button type="button" onClick={handleSaveChanges}>
            Save changes
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
