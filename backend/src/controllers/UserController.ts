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

    // Validate required fields and remove extra spaces
    if (!userData.name?.trim() || !userData.lastname?.trim() || userData.age == null || !userData.email?.trim()) {
      ctx.status = 400;
      ctx.body = { error: 'Todos los campos son obligatorios y no pueden ser solo espacios' };
      return;
    }

    const name = userData.name.trim()
    const lastname = userData.lastname.trim()
    const email = userData.email.trim().toLowerCase()
    const age = userData.age

    // Validate age
    if (typeof age !== 'number' || age < 18 || age > 120) {
      ctx.status = 400;
      ctx.body = { error: 'La edad debe estar comprendida entre los 18 y 120 años' };
      return;
    }

    // Validate max length
    if (name.length > 50 || lastname.length > 50 || email.length > 100) {
      ctx.status = 400;
      ctx.body = { error: 'Nombre y apellido no pueden superar los 50 caracteres; el email no puede superar los 100' };
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ctx.status = 400;
      ctx.body = { error: 'Formato de correo electrónico no válido' };
      return;
    }

    // Validate unique email
    if (userRepository.findAll().some(u => u.email === email)) {
      ctx.status = 409;
      ctx.body = { error: 'El email ya existe, introduzca otro, por favor' };
      return;
    }

    // Create normalized user
    const newUser = userRepository.create({ ...userData, name, lastname, email, age } as User);

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

  // Validate required fields and remove extra spaces
  if (!userData.name?.trim() || !userData.lastname?.trim() || userData.age == null || !userData.email?.trim()) {
    ctx.status = 400;
    ctx.body = { error: 'Todos los campos son obligatorios y no pueden ser solo espacios' };
    return;
  }

  const name = userData.name.trim()
  const lastname = userData.lastname.trim()
  const email = userData.email.trim().toLowerCase()
  const age = userData.age

  // Validate age
  if (typeof age !== 'number' || age < 18 || age > 120) {

    ctx.status = 400;
    ctx.body = { error: 'La edad debe estar comprendida entre los 18 y 120 años' };
    return;
  }

  // Validate max length
  if (name.length > 50 || lastname.length > 50 || email.length > 100) {
    ctx.status = 400;
    ctx.body = { error: 'Nombre y apellido no pueden superar los 50 caracteres; el email no puede superar los 100' };
    return;
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    ctx.status = 400;
    ctx.body = { error: 'Formato de correo electrónico no válido' };
    return;
  }

  // Validate unique email (excluding current user)
  const emailAlreadyExists = userRepository.findAll().some(u => u.email === email && u.id !== id);
  if (emailAlreadyExists) {
    ctx.status = 409;
    ctx.body = { error: 'El email ya existe, introduzca otro, por favor' };
    return;
  }

  // Update user with normalized values
  const updatedUser = await userRepository.update(id, { ...userData, name, lastname, email, age } as Partial<User>);
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



