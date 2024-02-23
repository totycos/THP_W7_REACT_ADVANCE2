import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PrivatePage from "./pages/PrivatePage";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/private" element={<PrivatePage />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
