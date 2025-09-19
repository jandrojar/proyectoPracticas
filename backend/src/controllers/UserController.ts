import { Context } from 'koa';
import UserRepository from '../repositories/UserRepository';
import { User } from '../models/user';


const userRepository = new UserRepository();
export async function getAllUsers(ctx: Context): Promise<void> {
    ctx.status = 200;
    const users = await userRepository.findAll();
    ctx.body = users;
}

export async function getUserById(ctx: Context): Promise<void> {
    const id = ctx.params.id;
    const user = userRepository.findById(id);

    if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
    }

    ctx.status = 200;
    ctx.body = user;
}

export async function createUser(ctx: Context): Promise<void> {
    try {
        const userData = ctx.request.body as Partial<User>;
        const newUser = userRepository.create(userData as User);
        ctx.status = 201;
        ctx.body = newUser;
    } catch (err) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid user data' };
    }

}

export async function updateUser(ctx: Context): Promise<void> {
    const id = ctx.params.id;
    const userData = ctx.request.body;
    const updatedUser = await userRepository.update(id, userData as Partial<User>);
    if (!updatedUser) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
    } else {
        ctx.status = 200;
        ctx.body = updatedUser;
    }
}

export async function deleteUser(ctx: Context): Promise<void> {
    const id = ctx.params.id;
    const deleted = await userRepository.delete(id);
    if (!deleted) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
    } else {
        ctx.status = 204; // No content
    }
}



