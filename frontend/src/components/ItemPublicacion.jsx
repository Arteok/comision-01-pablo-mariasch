import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import Swal from "sweetalert2";
import { API_URL } from "../utils/consts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return date.toLocaleDateString("es-ES", options);
  } catch (error) {
    return "Invalid date";
  }
};

const ItemPublicacion = ({
  playlistId,
  title,
  avatar,
  username,
  createdAt,
  musics,
  refresh,
}) => {
  const { auth } = useContext(AuthContext);

  const handleDelete = async (playlistId) => {
    return await fetch(`${API_URL}/playlist/${playlistId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
    });
  };
  /*-------------------*/

  const [playlist, setPlaylist] = useState(null);

  const getPlaylist = (playlistId) => {
    // Si no hay token o auth es null, redirige a la página de inicio de sesión
    if (!auth || !auth.token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/playlist/${playlistId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlaylist(data);
      })      
  };

  useEffect(() => {
    getPlaylist(playlistId);
  }, []);

  /*------------------*/

  return (
    <div className="card mb-3">
      <div className="row g-0">
        {/* <div className="col-md-4">
          <img src={avatar} className="img-fluid rounded-start" />
        </div> */}

        <picture className="m-2">
          <img
            src={avatar}
            alt="Avatar"
            className="clase-css"
            style={{
              height: 70,
              width: 70,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </picture>

        <div className="col-md-12">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <div className="col-md-4">
              <img src={avatar} className="img-fluid " />
            </div>

            <p className="card-text">
              <b>{username}: </b>
              <span>{avatar}</span>
            </p>
            <p className="mt-2"> {createdAt}</p>
            <p>
              <strong>Fecha de creación:</strong>
              {formatDate(createdAt)}
            </p>

            <div className="d-flex flex-row justify-content-between">
              <div className="m-1 d-flex flex-row justify-content-end w-100">
                <div className="m-1">
                  <Link
                    className="btn btn-primary"
                    to={`/playlist/${playlistId}`}
                  >
                    <HiOutlinePencilAlt />
                    <span className="ml-1"> Comentar</span>
                  </Link>
                </div>

                <div className="m-1">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDelete(playlistId).then((res) => {
                            if (res.status !== 200) {
                              return Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                timer: 2500,
                              });
                            } else {
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                              });
                              refresh();
                            }
                          });
                        }
                      });
                    }}
                  >
                    <HiOutlineTrash />
                    <span className="ml-1"> Eliminar</span>
                  </button>
                </div>

              </div>
            </div>
            {playlist && playlist.musics.length > 0 && (
              <>
                {playlist.musics.map((music, index) => (
                  <div
                    key={music.id}
                    className="p-3 mt-2 mb-2 border rounded"
                    style={{ backgroundColor: "azure" }}
                  >
                    <p>{music.name}</p>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p>
                          <strong>Autor:</strong> {username}
                        </p>
                        <p>
                          <strong>Fecha de comentario:</strong>{" "}
                          {formatDate(music.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPublicacion;
