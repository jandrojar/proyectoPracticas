import { Context, Next } from "koa";
import { sessionRepo } from "../repositories/index"



// Authentication middleware to protect routes
export async function authMiddleware(ctx: Context, next: Next) {
  const authHeader = ctx.headers["authorization"];

  // Check for Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ctx.status = 401;
    ctx.body = { error: "La autorización no está presente o es inválida" };
    return;
  }

  // Extract the token from the header
  const token = authHeader.substring(7);

  // Find session by token
  const session = sessionRepo.findByToken(token);

  // Validate session
  if (!session) {
    ctx.status = 401;
    ctx.body = { error: "Token inválido" };
    return;
  }

  // Check if session is expired
  /*const now = new Date();
  if (session.expiryDate < now) {
    ctx.status = 401;
    ctx.body = { error: "La sesión ha expirado" };
    return;
  }*/

  // Session is valid, proceed to next middleware/controller
  await next();
}