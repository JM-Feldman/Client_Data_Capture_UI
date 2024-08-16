import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService, Client } from '../../services/client.service';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      basicDetails: ['', Validators.required]
    });
  }

  addClient(): void {
    if (this.clientForm.valid) {
      const newClient: Client = {
        clientId: 0,
        name: this.clientForm.value.name,
        gender: this.clientForm.value.gender,
        basicDetails: this.clientForm.value.basicDetails,
        addresses: [],
        contactinfos: []
      };

      this.clientService.addClient(newClient).subscribe((createdClient: Client) => {
        this.router.navigate([`/address/${createdClient.clientId}`]);
      });
    }
  }
}



