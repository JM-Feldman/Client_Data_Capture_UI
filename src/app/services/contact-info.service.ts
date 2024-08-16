import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactInfo {
  contactInfoId: number;
  clientId: number;
  workNumber: number;
  cellNumber: number;
  workEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  private apiUrl = 'https://localhost:7061/api/contactinfo';

  constructor(private http: HttpClient) {}

  getContactInfosByClientId(clientId: number): Observable<ContactInfo[]> {
    return this.http.get<ContactInfo[]>(`${this.apiUrl}/client/${clientId}`);
  }

  addContactInfo(contactInfo: ContactInfo): Observable<ContactInfo> {
    return this.http.post<ContactInfo>(this.apiUrl, contactInfo);
  }

  updateContactInfo(contactInfoId: number, contactInfo: ContactInfo): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${contactInfoId}`, contactInfo);
  }

  deleteContactInfo(contactInfoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${contactInfoId}`);
  }
}

