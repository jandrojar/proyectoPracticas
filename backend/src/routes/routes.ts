import Router from '@koa/router';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController';

const apiRouter = new Router({
  prefix: '/users'
});

apiRouter.get('/', getAllUsers);
apiRouter.get('/:id', getUserById);
apiRouter.post('/', createUser);
apiRouter.put('/:id', updateUser);
apiRouter.delete('/:id', deleteUser);

export default apiRouter;

