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

const ItemInicio = ({ playlistId, title, descripcion, avatar, username, musics, refresh }) => {
  const { auth } = useContext(AuthContext);   

  console.log('playlistId:', playlistId);
  console.log('title:', title);
  console.log('descripcion:', descripcion);
  console.log('avatar:', avatar);
  console.log('username:', username);
  console.log('musics:', musics);
  console.log('refresh:', refresh);
  console.log('auth:', auth);





  const handleDelete = async (playlistId) => {
    return await fetch(`${API_URL}/playlist/${playlistId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
    });
  }; 

  return (
    <div className="card mb-3">
      <div className="row g-0">
        {/*  <div className="col-md-4">
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
        {/*  */}
        <div className="col-md-12">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <div className="col-md-4">
              <img src={avatar} className="img-fluid " />
            </div>
            {/*  */}

            <p className="card-text">
              <b>{username}: </b>
              <span>{avatar}</span>
            </p>
            <p className="mt-2"> {/* {createdAt} */}</p>
            <p>
              <strong>Fecha de creación:</strong>
              {/* {formatDate(createdAt)} */}
            </p>

            {/*  */}
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
              </div>
            </div>
            {musics.length > 0 && (
              <>
                {musics.map((musics, index) => (
                  <div
                    key={musics.id}
                    className="p-3 mt-2 mb-2 border rounded"
                    style={{ backgroundColor: "azure" }}
                  >
                    <p>{musics.name}</p>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p>
                          <strong>Autor:</strong> {username}
                        </p>
                        <p>
                          <strong>Fecha de comentario:</strong>{" "}
                          {formatDate(musics.year)}
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

export default ItemInicio;
