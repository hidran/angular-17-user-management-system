import { Injectable } from '@angular/core';
export interface User {
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
  users: User[] = [
    { name: "Mario", lastName: "Rossi", fiscalCode: "RSSMRA80A01H501U", phone: "1234567890", province: "Roma", email: "mario.rossi@example.com" },
    { name: "Luigi", lastName: "Bianchi", fiscalCode: "BNCLGU80A01H501V", phone: "0987654321", province: "Milano", email: "luigi.bianchi@example.com" },
    { name: "Giulia", lastName: "Verdi", fiscalCode: "VRDGIL80A01H501K", phone: "2345678901", province: "Torino", email: "giulia.verdi@example.com" },
    { name: "Elena", lastName: "Gialli", fiscalCode: "GLLELN80A01H501S", phone: "3456789012", province: "Napoli", email: "elena.gialli@example.com" },
    { name: "Marco", lastName: "Neri", fiscalCode: "NRIMRC80A01H501N", phone: "4567890123", province: "Palermo", email: "marco.neri@example.com" },
    { name: "Alessia", lastName: "Marrone", fiscalCode: "MRRALS80A01H501Q", phone: "5678901234", province: "Genova", email: "alessia.marrone@example.com" },
    { name: "Andrea", lastName: "Celeste", fiscalCode: "CLSTND80A01H501Z", phone: "6789012345", province: "Bologna", email: "andrea.celeste@example.com" },
    { name: "Sara", lastName: "Rosa", fiscalCode: "RSASRA80A01H501X", phone: "7890123456", province: "Firenze", email: "sara.rosa@example.com" },
    { name: "Paolo", lastName: "Viola", fiscalCode: "VLAPAO80A01H501C", phone: "8901234567", province: "Venezia", email: "paolo.viola@example.com" },
    { name: "Simone", lastName: "Arancio", fiscalCode: "ARNSMN80A01H501M", phone: "9012345678", province: "Catania", email: "simone.arancio@example.com" },
    { name: "Chiara", lastName: "Azzurra", fiscalCode: "AZZCHR80A01H501R", phone: "0123456789", province: "Bari", email: "chiara.azzurra@example.com" }
  ];
  getUser(): User[] {
    return this.users;
  }
  constructor() {
    console.log('user service created')
  }
}
