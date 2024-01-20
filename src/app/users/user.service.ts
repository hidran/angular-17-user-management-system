import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  fiscalCode: string;
  phone: string;
  province: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUpdated = new Subject<User>();
  userCreated = new Subject<User>();
  userDeleted = new Subject<User>();

  users: User[] = [
    { id: 1, name: "Mario", lastName: "Rossi", fiscalCode: "RSSMRA80A01H501U", phone: "1234567890", province: "Roma", email: "mario.rossi@example.com" },
    { id: 2, name: "Luigi", lastName: "Bianchi", fiscalCode: "BNCLGU80A01H501V", phone: "0987654321", province: "Milano", email: "luigi.bianchi@example.com" },
    { id: 3, name: "Giulia", lastName: "Verdi", fiscalCode: "VRDGIL80A01H501K", phone: "2345678901", province: "Torino", email: "giulia.verdi@example.com" },
    { id: 4, name: "Elena", lastName: "Gialli", fiscalCode: "GLLELN80A01H501S", phone: "3456789012", province: "Napoli", email: "elena.gialli@example.com" },
    { id: 5, name: "Marco", lastName: "Neri", fiscalCode: "NRIMRC80A01H501N", phone: "4567890123", province: "Palermo", email: "marco.neri@example.com" },
    { id: 6, name: "Alessia", lastName: "Marrone", fiscalCode: "MRRALS80A01H501Q", phone: "5678901234", province: "Genova", email: "alessia.marrone@example.com" },
    { id: 7, name: "Andrea", lastName: "Celeste", fiscalCode: "CLSTND80A01H501Z", phone: "6789012345", province: "Bologna", email: "andrea.celeste@example.com" },
    { id: 8, name: "Sara", lastName: "Rosa", fiscalCode: "RSASRA80A01H501X", phone: "7890123456", province: "Firenze", email: "sara.rosa@example.com" },
    { id: 9, name: "Paolo", lastName: "Viola", fiscalCode: "VLAPAO80A01H501C", phone: "8901234567", province: "Venezia", email: "paolo.viola@example.com" },
    { id: 10, name: "Simone", lastName: "Arancio", fiscalCode: "ARNSMN80A01H501M", phone: "9012345678", province: "Catania", email: "simone.arancio@example.com" },
    { id: 11, name: "Chiara", lastName: "Azzurra", fiscalCode: "AZZCHR80A01H501R", phone: "0123456789", province: "Bari", email: "chiara.azzurra@example.com" }
  ];
  getUsers(): User[] {
    return this.users;
  }
  getUser(id: number): User | null {
    const idx = this.users.findIndex(ele => ele.id === id);

    if (idx === -1) {
      return null;
    }
    return { ...this.users[idx] };
  }
  constructor() {
    console.log('user service created')
  }
  deleteUser(user: User): void {

    const idx = this.users.findIndex(ele => ele.id === user.id);

    this.users.splice(idx, 1);

  }
  updateUser(user: User): boolean {

    const idx = this.users.findIndex(ele => ele.id === user.id);

    if (idx === -1) {
      return false;
    }
    this.users[idx] = { ...user };

    return true;
  }
  createUser(user: User): boolean {

    const idx = this.users.findIndex(ele => ele.email === user.email);

    if (idx !== -1) {
      return false;
    }
    user.id = this.users.length + 1;
    this.users.push(user);

    return true;
  }
}

