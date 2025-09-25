import InMemoryDB from './InMemoryDB'
import { User } from '../models/user'

// User repository class extending the generic InMemoryDB for User types
export default class UserRepository extends InMemoryDB<User> {
  constructor(){
    super();
    this.seedUsers();
  }

  // Seed users with some initial data
  private seedUsers(): User[] {
    const sampleUsers: User[] = [
      {
        id: '1',
        name: 'Juan',
        lastname: 'Pérez',
        age: 30,
        email: 'juan.perez@email.com',
        password: 'password123'
      },
      {
        id: '2',
        name: 'María',
        lastname: 'González',
        age: 25,
        email: 'maria.gonzalez@email.com',
        password: 'password456'
      },
      {
        id: '3',
        name: 'Carlos',
        lastname: 'Rodríguez',
        age: 35,
        email: 'carlos.rodriguez@email.com',
        password: 'password789'
      },
      {
        id: '4',
        name: 'Ana',
        lastname: 'Martínez',
        age: 28,
        email: 'ana.martinez@email.com',
        password: 'password101'
      },
      {
        id: '5',
        name: 'Luis',
        lastname: 'Sánchez',
        age: 32,
        email: 'luis.sanchez@email.com',
        password: 'password202'
      }
    ];

    return this.createMany(sampleUsers);
  }

}