import { header } from 'express-validator';
import { applyValidations } from '../../middlewares/apply-validations.js';

export const authHeader = [
 header('authorization')
    .exists().withMessage('Debe enviar el header { Authorization } con el token.'),
  applyValidations
]; 
 

/* export const authHeader = (excludedRoutes = []) => [
  (req, res, next) => {
    // Verificar si la ruta actual está en la lista de rutas excluidas
    if (excludedRoutes.includes(req.path)) {
      return next(); 
    }

    // Validar la existencia del encabezado de autorización para otras rutas
    return header('authorization')
      .exists()
      .withMessage('Debe enviar el header { Authorization } con el token.')(req, res, next);
  },
  applyValidations,
]; */