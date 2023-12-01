import useTareas from "./hooks/useTareas"

const App = () => {

  const {tareas, handleSubmit, handleDelete} = useTareas()

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Titulo"/>
        <input type="text" name="descripcion" placeholder="Descripcion"/>
        <button>crear</button>
      </form>
      {
        tareas.map(tarea => {
          return (
            <div key={tarea.id} className="tarea">
              <h2>{tarea.titulo}</h2>
              <p>{tarea.descripcion}</p>
              {tarea.completada ? <p>Completada</p> : <p>Pendiente</p>}
              <button
                onClick={() => handleDelete(tarea.id)}
              >Eliminar</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default App