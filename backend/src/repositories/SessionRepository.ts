import InMemoryDB from "./InMemoryDB"
import { Session } from "../models/session"

export default class SessionRepository extends InMemoryDB<Session> {
  findByToken(token: string): Session | undefined {
    return this.findAll().find(session => session.token === token);
  }
}