import { verifyJWT } from '../utils/jwt.js';
import { UserModel } from '../models/User.js';

export const validateToken = async (req, res, next) => {
  try {
    // Obtén el token de los encabezados
    const token = req.headers.authorization;

    // Si no hay token, devuelve un error de no autorizado
    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }

    // Verifica si el token es igual al token personalizado
    const customToken = 'TOKEN_PERSONALIZADO';

    if (token === customToken) {      

      // Continúa con la ejecución del siguiente middleware o controlador
      return next();
    }

    // Intenta verificar el token normal
    const { userId } = await verifyJWT({ token });

    // Busca al usuario en la base de datos
    const user = await UserModel.findOne({ _id: userId });

    // Si no se encuentra al usuario, devuelve un error de no autorizado
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Almacena la información del usuario en el objeto de solicitud (req.user)
    req.user = user;

    // Continúa con la ejecución del siguiente middleware o controlador
    next();
  } catch (error) {
    // Si hay algún error durante la verificación del token, devuelve un error de no autorizado
    res.status(401).json({ error: 'Invalid token' });
  }
};






/* import { verifyJWT } from '../utils/jwt.js';
import { UserModel } from '../models/User.js';

export const validateToken = async (req, res, next) => {
  try {

    
    const token = req.headers.authorization;

    const { userId } = await verifyJWT({ token });

    const user = await UserModel.findOne({ _id: userId });

    if (!user) return res.status(401).json({ error: 'Invalid token' });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}; */
