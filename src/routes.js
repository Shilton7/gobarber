import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

//users
routes.post('/users', UserController.store);

//session
routes.post('/sessions', SessionController.store);

export default routes;
