import { Context } from 'koa';
import { Session } from '../models/session';
import { sessionRepo, userRepo } from '../repositories/index';


/**
 * Controller to handle user login
 * Validates user credentials and creates a session if valid
 * Expects { email: string, password: string } in the request body
 * Returns user info and session token on success
 * Returns appropriate error messages on failure
 */
export async function login(ctx: Context): Promise<void> {
    const data = ctx.request.body as { email?: string; password?: string };

    if (!data.email || !data.password) {
        ctx.status = 400;
        ctx.body = { error: 'Email y contraseña son obligatorios' };
        return;
    }

    const email = data.email.trim().toLowerCase();

    // Find user by email
    const user = userRepo.findAll().find(u => u.email === email)

    // Validate user and password
    if(!user || user.password !== data.password){
        ctx.status = 401;
        ctx.body = { error: 'Credenciales inválidas' };
        return;
    }

    // Create session
    const token = crypto.randomUUID();
    const now = new Date();
    const expiry = new Date(now.getTime() + 60 * 60 * 1000); // Expires in 1 hour

    const session: Session = {
      id: crypto.randomUUID(),
      userId: user.id,
      token,
      startDate: now,
      expiryDate: expiry
    }

    sessionRepo.create(session);

    // Return user info and token
    ctx.status = 200;
    ctx.body = {
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        age: user.age,
        email: user.email
      },
      token
    }
}

export async function getSessions(ctx: Context): Promise<void> {
  ctx.status = 200;
  ctx.body = sessionRepo.findAll();
}
