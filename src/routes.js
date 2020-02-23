import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddlewares from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

const routes = new Router();
const upload = multer(multerConfig);

//users
routes.post('/users', UserController.store);
routes.put('/users', authMiddlewares, UserController.update);

//session
routes.post('/sessions', SessionController.store);

//upload
routes.post(
  '/files',
  authMiddlewares,
  upload.single('file'),
  FileController.store
);

//provider
routes.get('/providers', authMiddlewares, ProviderController.index);

//appointment
routes.post('/appointments', authMiddlewares, AppointmentController.store);

//appointment user
routes.get('/appointments', authMiddlewares, AppointmentController.index);

export default routes;
