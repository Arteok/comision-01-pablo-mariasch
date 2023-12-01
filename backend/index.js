import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import {header, body, validationResult} from "express-validator"

const app = express()

// middlewares (funciones que se ejecutan antes de llegar a los controladores)
app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())

let tareas = []

const crearTareas = (tarea) => {
  const newTarea=  {
    id: Date.now(),
    ...tarea
  }
  tareas.push(newTarea)
  return newTarea
}

const eliminarTarea = (id) => {
  tareas = tareas.filter(tarea => tarea.id !== Number(id))
}

// routes
app.get('/', (req, res) => {
  res.json(tareas)
})

const ctrlCrearTarea = (req, res) => {
  try {
    const newTarea = crearTareas(req.body)
    res.status(201).json(newTarea)
  } catch (error) {
    res.status(400).json({error: error.message})
  } 
}

function cleanErrors (errors) {
  const errorsGroup = {};

  errors.forEach((objeto) => {
    const path = objeto.path;
    const location = objeto.location;

    if (!errorsGroup[location]) {
      errorsGroup[location] = {};
    }

    if (!errorsGroup[location][path]) {
      errorsGroup[location][path] = [];
    }

    errorsGroup[location][path].push(
      objeto.msg
    );
  });

  return errorsGroup;
}



const validador = (req, res, next) => {
  const errores = validationResult(req)

  if (!errores.isEmpty()) {
    return res.status(400).json({errores: cleanErrors(errores.array())})
  }

  next()
}

const middlewareValidacion = [
  body("titulo")
    .notEmpty().withMessage("El titulo es requerido")  
    .isLength({min: 3}).withMessage("El titulo debe tener al menos 3 caracteres")
    .isString().withMessage("El titulo debe ser un string"),
  body("descripcion")
    .notEmpty().withMessage("El titulo es requerido")  
    .isString().withMessage("La descripcion debe ser un string"),
  body("completado").isBoolean().withMessage("La propiedad completado debe ser un booleano"),
  validador
]

app.post('/',middlewareValidacion, ctrlCrearTarea)

app.delete('/:id', (req, res) => {
  const { id } = req.params
  eliminarTarea(id)
  res.sendStatus(200)
})

app.listen(4000, () => {
  console.log("Server on port 4000")
})