import { Context } from 'koa';
import UserRepository from '../repositories/UserRepository';
import { User } from '../models/user';

// User repository instance
const userRepository = new UserRepository();
export async function getAllUsers(ctx: Context): Promise<void> {
    ctx.status = 200;
    const users = await userRepository.findAll();

    if(users.length === 0){
        ctx.status = 404;
        ctx.body = {error:'No hay usuarios registrados'};
        return;
    }
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

        // Check for required fields
        if (!userData.name || !userData.lastname || !userData.age || !userData.email) {
            ctx.status = 400;
            ctx.body = { error: 'Todos los campos son obligatorios' };
            return;
        }

        // Check for valid age
        if (typeof userData.age !== 'number' || userData.age < 18 || userData.age > 120) {
            ctx.status = 400;
            ctx.body = { error: 'La edad debe estar comprendida entre los 18 y 120 años' };
            return;
        }

        // Check for valid email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            ctx.status = 400;
            ctx.body = { error: 'Formato de correo electrónico no válido' };
            return;
        }

        // Check for unique email
        if(userRepository.findAll().some(u => u.email === userData.email)) {
            ctx.status = 409;
            ctx.body = { error: 'El email ya existe, introduzca otro, por favor' };
            return;
        }

        const newUser = userRepository.create(userData as User);
        ctx.status = 201;
        ctx.body = newUser;

    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Error interno en el servidor' };
    }

}

export async function updateUser(ctx: Context): Promise<void> {
    const id = ctx.params.id;
    const userData = ctx.request.body as Partial<User>;

    // Check if user exists
    const existingUser = userRepository.findById(id);
    if (!existingUser) {
        ctx.status = 404;
        ctx.body = { error: 'Usuario no encontrado' };
        return;
    }

    if (!userData.name || !userData.lastname || !userData.age || !userData.email) {
        ctx.status = 400;
        ctx.body = { error: 'Todos los campos son obligatorios' };
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        ctx.status = 400;
        ctx.body = { error: 'Formato de correo electrónico no válido' };
        return;
    }

    const emailAlreadyExists = userRepository.findAll().some( u => u.email === userData.email && u.id !== id);
    if (emailAlreadyExists) {
        ctx.status = 409;
        ctx.body = { error: 'El email ya existe, introduzca otro, por favor' };
        return;
    }

    if (typeof userData.age !== 'number' || userData.age < 18 || userData.age > 120) {
        ctx.status = 400;
        ctx.body = { error: 'La edad debe ser un número entre 18 y 120' };
        return;
    }

    const updatedUser = await userRepository.update(id, userData as Partial<User>);
        ctx.status = 200;
        ctx.body = updatedUser;

}

export async function deleteUser(ctx: Context): Promise<void> {
    const id = ctx.params.id;
    const deleted = await userRepository.delete(id);
    if (!deleted) {
        ctx.status = 404;
        ctx.body = { error: 'Usuario no encontrado' };
        return;
    } else {
        ctx.status = 204; // No content
    }
}



