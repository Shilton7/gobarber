import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

//users
routes.post('/users', UserController.store);

export default routes;
