import Router from '@koa/router';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController';
import { login, getSessions } from '../controllers/SessionController';
import { authMiddleware } from '../middleware/authMiddleware';

const apiRouter = new Router({
  prefix: '/users'
});

apiRouter.post('/login', login);
apiRouter.get('/sessions', getSessions);

apiRouter.get('/', authMiddleware, getAllUsers);
apiRouter.get('/:id', authMiddleware, getUserById);
apiRouter.post('/', authMiddleware, createUser);
apiRouter.put('/:id', authMiddleware, updateUser);
apiRouter.delete('/:id', authMiddleware, deleteUser);

export default apiRouter;

