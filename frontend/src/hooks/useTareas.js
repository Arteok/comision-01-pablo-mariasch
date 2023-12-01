import { useEffect, useState } from "react"
import { crearTarea, eliminarTarea, obtenerTareas } from "../services/tareas"

const useTareas = () => {

  const [tareas, setTareas] = useState([])

  const getTareas = () => {
    obtenerTareas()
      .then(res => res.json())
      .then(data => setTareas(data))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const titulo = formData.get("titulo")
    const descripcion = formData.get("descripcion")

    crearTarea({titulo, descripcion})
      .then(res => {
        if (res.status !== 201) {
          return alert("Ocurrio un error")
        }

        getTareas()
      })
  }

  const handleDelete = (id) => {
    eliminarTarea(id)
      .then(res => {
        if (res.status !== 200) {
          return alert("Ocurrio un error")
        }

        getTareas()
      })
  }

  useEffect(() => {
    getTareas()
  }, [])


  return {tareas, handleSubmit, handleDelete}
}

export default useTareas