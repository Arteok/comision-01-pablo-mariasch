import { Router } from 'express';

import {
  ctrlCreatePlaylist,
  ctrlDeletePlaylist,
  ctrlGetPlaylist,
  ctrlListPlaylist,
  ctrlListAllPlaylists, // Nueva función para obtener todas las listas de reproducción
  ctrlUpdatePlaylist,
} from '../controllers/playlist.controller.js';
import {
  createPlaylistValidations,
  deletePlaylistValidations,
  getPlaylistValidations,
  listPlaylistValidations,
  updatePlaylistValidations
} from '../models/validations/playlist-validations.js';

const playlistRouter = Router();

playlistRouter.post('/', createPlaylistValidations, ctrlCreatePlaylist);
playlistRouter.get('/', listPlaylistValidations, ctrlListPlaylist);
playlistRouter.get('/all', ctrlListAllPlaylists); // Excluida de las validaciones
playlistRouter.get('/:playlistId', getPlaylistValidations, ctrlGetPlaylist);
playlistRouter.patch('/:playlistId', updatePlaylistValidations, ctrlUpdatePlaylist);
playlistRouter.delete('/:playlistId', deletePlaylistValidations, ctrlDeletePlaylist);

export { playlistRouter };
