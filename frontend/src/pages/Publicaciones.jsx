import ItemPublicacion from "../components/ItemPublicacion";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";

const Publicaciones = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  const [search, setSearch] = useState("");

  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const getAllPlaylist = () => {

     // Si no hay token o auth es null, redirige a la página de inicio de sesión
    if (!auth || !auth.token) {    
      
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/playlist`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  };

  useEffect(() => {
    getAllPlaylist();
  }, []);

  useEffect(() => {
    const filtereds = playlists.filter((play) => {
      return play.title.toLowerCase().includes(search.toLowerCase().trim());
    });

    setFilteredPlaylists(filtereds);
  }, [playlists, search]);

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
      <h1>Publicaciones</h1>
      <div className="w-50 d-flex flex-row gap-2 mt-4">
        <Link className="btn btn-success" to="/playlist/new">
          Create
        </Link>
        <input
          type="search"
          placeholder="Search"
          className="form-control"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="w-50 d-flex flex-column gap-2 mt-4">
        {filteredPlaylists.map((play) => {
          return (
            <ItemPublicacion
              key={play._id}
              playlistId={play._id}
              title={play.title}
              username={play.author.username}
              avatar={play.author.avatar}
              musics={play.musics}
              refresh={getAllPlaylist}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Publicaciones;
