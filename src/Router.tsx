import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import MeCart from "./pages/UserCart";
import AllItem from "./pages/ItemsPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/me" element={<NotFound />} />
        <Route path="/mecart" element={<MeCart />} />
        <Route path="/showitems" element={<AllItem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
