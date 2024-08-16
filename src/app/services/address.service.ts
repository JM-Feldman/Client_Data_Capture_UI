import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'https://localhost:7061/api/address';

  constructor(private http: HttpClient) {}

  getAddressesByClientId(clientId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/client/${clientId}`);
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address);
  }

  updateAddress(addressId: number, address: Address): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${addressId}`, address);
  }

  deleteAddress(addressId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${addressId}`);
  }
}

