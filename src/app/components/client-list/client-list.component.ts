import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService, Client } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-client-list',
  standalone: true,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  editForm: FormGroup | null = null;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe(data => {
      this.clients = data.map(client => ({
        ...client,
        addresses: client.addresses || [],
        contactinfos: client.contactinfos || []
      }));
      console.log('Processed Clients:', this.clients);
    });
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
  }

  editClient(): void {
    if (this.selectedClient) {
      this.editForm = this.fb.group({
        name: [this.selectedClient.name],
        gender: [this.selectedClient.gender],
        basicDetails: [this.selectedClient.basicDetails]
      });
    }
  }

  saveChanges(): void {
    if (this.editForm && this.selectedClient) {
      const updatedClient: Client = {
        clientId: this.selectedClient.clientId,
        name: this.editForm.value.name,
        gender: this.editForm.value.gender,
        basicDetails: this.editForm.value.basicDetails,
        addresses: [],
        contactinfos: []
      };
      this.clientService.updateClient(this.selectedClient.clientId, updatedClient).subscribe(() => {
        this.loadClients();
        this.editForm = null;
        this.selectedClient = null;
      });
    }
  }

  exportToCSV(): void {
    const header = 'ClientId,Name,Gender,AddressType,AddressLine,City,State,PostalCode,WorkEmail\n';
    const csvRows = this.clients.flatMap(client => 
      client.addresses.map(address => {
        const contactInfo = client.contactinfos.length > 0 ? client.contactinfos[0] : { workEmail: '' };
  
        return `${client.clientId},"${client.name}","${client.gender}","${address.addressType}","${address.addressLine}","${address.city}","${address.state}","${address.postalCode}","${contactInfo.workEmail}"`;
      })
    );
  
    const csvContent = header + csvRows.join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'clients.csv');
  }
  

  navigateToAddClient(): void {
    this.router.navigate(['/add-client']);
  }

  navigateToAddAddress(): void {
    if (this.selectedClient) {
      this.router.navigate([`/add-address/${this.selectedClient.clientId}`]);
    }
  }

  navigateToAddContactInfo(): void {
    if (this.selectedClient) {
      this.router.navigate([`/add-contact-info/${this.selectedClient.clientId}`]);
    }
  }

  navigateToEditAddress(): void {
    if (this.selectedClient) {
      this.router.navigate([`/address/${this.selectedClient.clientId}`]);
    }
  }

  navigateToEditContactInfo(): void {
    if (this.selectedClient) {
      this.router.navigate([`/contact-info/${this.selectedClient.clientId}`]);
    }
  }

  deleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(() => {
      this.clients = this.clients.filter(client => client.clientId !== clientId);
      this.selectedClient = null;
    });
  }
}

