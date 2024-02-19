import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConnectionPage from "./pages/ConnectionPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import OtherProfilePage from "./pages/OtherProfilePage";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/connection" element={<ConnectionPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/profile" element={<ProfilePage />} exact />
            <Route
              path="/user/:username"
              element={<OtherProfilePage />}
              exact
            />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
