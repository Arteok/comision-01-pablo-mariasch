import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };  

  // Nueva función para navegar a la página de inicio de sesión
  const handleNavigateToLogin = () => {
    navigate('/login');
  };

 // Verificar si auth está definido y no es null
 const isAuthenticated = auth && auth.token;

 const handleNavigateToCrear = () => {
  if (!isAuthenticated) {
    handleNavigateToLogin();
  } else {
    // Continuar con la lógica normal para ir a la página de "Crear"
    navigate('/playlist/new');
  }
};

const handleNavigateToPublicaciones = () => {
  if (!isAuthenticated) {
    handleNavigateToLogin();
  } else {
    // Continuar con la lógica normal para ir a la página de "Publicaciones"
    navigate('/playlist');
  }
};



  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body sticky-top"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
                to="/"
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
                to="/playlist"
                onClick={handleNavigateToPublicaciones}
              >
                Publicaciones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
                to="/playlist/new"
                onClick={handleNavigateToCrear}
              >
                Crear Publicaciones
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex" role="search">
          {!auth || !auth.token ? (
            <Link className="btn btn-outline-success btn-sm" to="/login">
              Login
            </Link>
          ) : (
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


