import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactInfo } from './contact-info.service';

export interface Client {
  clientId: number;
  name: string;
  gender: string;
  basicDetails: string;
  addresses: Address[];
  contactinfos: ContactInfo[]
}

export interface Address {
  addressId: number;
  clientId: number;
  addressType: string; 
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
}


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:7061/api/client';

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(clientId: number, client: Client): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${clientId}`, client);
  }

  deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${clientId}`);
  }
}

