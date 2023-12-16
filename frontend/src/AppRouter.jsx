import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio2"
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./pages/404Page";
import Publicaciones from "./pages/Publicaciones";
import PrivateRoutes from "./components/PrivateRoutes";
import NewPublicacion from "./pages/NewPublicacion";
import MusicPage from "./pages/MusicPage";
import NewMusicPage from "./pages/NewMusicPage";

function AppRouter() {
  return (
    <Routes>
      {/* Rutas Protegidas */}
      <Route element={<PrivateRoutes />}>
      
        <Route path="/playlist" element={<Publicaciones />} />
        <Route path="/playlist/new" element={<NewPublicacion />} />
        <Route path="/playlist/:playlistId" element={<MusicPage />} />
        <Route path="/music/:playlistId" element={<NewMusicPage />} />
      </Route>

      {/* Rutas Públicas */}
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default AppRouter;
