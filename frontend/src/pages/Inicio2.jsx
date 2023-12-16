import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import ItemInicio from "../components/ItemInicio";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";

const Inicio = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  const [search, setSearch] = useState("");

  const { auth } = useContext(AuthContext);

  const getAllPlaylist = () => {

    const customToken = "TOKEN_PERSONALIZADO";

    fetch(`${API_URL}/playlist/all`, {
      headers: {
        Authorization: customToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
      .catch((error) => console.error("Error fetching playlists:", error));
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
    <div>
      <Navbar />
      <div
        className="w-100 d-flex justify-content-center align-items-center h-100"
        style={{ minWidth: "100vw" }}
      >
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
          <h1>Inicio</h1>
          <div className="w-50 d-flex flex-row gap-2 mt-4">
            <Link className="btn btn-success" to="/playlist/new">
              Create
            </Link>
            <input
              type="search"
              placeholder="Que estás buscando?"
              className="form-control"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="w-50 d-flex flex-column gap-2 mt-4">
            {filteredPlaylists.map((play) => {
              return (
                <ItemInicio
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
      </div>
    </div>
  );
}
export default Inicio;
