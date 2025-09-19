import InMemoryDB from './InMemoryDB'
import { User } from '../models/user'

export default class UserRepository extends InMemoryDB<User> {
  constructor(){
    super();
    this.seedUsers();
  }
  private seedUsers(): User[] {
    const sampleUsers: User[] = [
      {
        id: '1',
        name: 'Juan',
        lastname: 'Pérez',
        age: 30,
        email: 'juan.perez@email.com'
      },
      {
        id: '2',
        name: 'María',
        lastname: 'González',
        age: 25,
        email: 'maria.gonzalez@email.com'
      },
      {
        id: '3',
        name: 'Carlos',
        lastname: 'Rodríguez',
        age: 35,
        email: 'carlos.rodriguez@email.com'
      },
      {
        id: '4',
        name: 'Ana',
        lastname: 'Martínez',
        age: 28,
        email: 'ana.martinez@email.com'
      },
      {
        id: '5',
        name: 'Luis',
        lastname: 'Sánchez',
        age: 32,
        email: 'luis.sanchez@email.com'
      }
    ];

    return this.createMany(sampleUsers);
  }

}