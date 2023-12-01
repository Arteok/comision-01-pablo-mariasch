const API_URL = 'http://localhost:4000'

export const crearTarea = async ({ titulo, descripcion }) => {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo,
      descripcion,
      completado: false
    })
  })
}

export const obtenerTareas = async () => {
  return fetch(API_URL)
}

export const eliminarTarea = async (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
}