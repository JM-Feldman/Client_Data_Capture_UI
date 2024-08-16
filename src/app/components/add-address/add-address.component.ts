import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { Address } from '../../services/client.service';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  clientId!: number;
  addressForm!: FormGroup;

  addressTypes = ['Residential Address', 'Work Address', 'Postal Address'];

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clientId = +params.get('clientId')!;
    });

    this.addressForm = this.fb.group({
      type: ['', Validators.required],
      addressLine: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  addAddress(): void {
    if (this.addressForm.valid) {
      const newAddress: Address = {
        addressId: 0,
        clientId: this.clientId, // Match this field with expected name in API if required
        addressType: this.addressForm.value.type, // Should match AddressType in API
        addressLine: this.addressForm.value.addressLine,
        city: this.addressForm.value.city,
        state: this.addressForm.value.state,
        postalCode: this.addressForm.value.postalCode
      };
  
      this.addressService.addAddress(newAddress).subscribe({
        next: (response) => {
          this.router.navigate([`/contact-info/${this.clientId}`]);
        },
        error: (err) => {
          console.error('Error adding address:', err);
          alert('An error occurred while adding the address. Please check the console for details.');
        }
      });
    }
  }
  
  
}
