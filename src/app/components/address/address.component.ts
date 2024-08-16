import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { Address } from '../../services/client.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  clientId!: number;
  addressForm!: FormGroup;
  addresses: Address[] = [];

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
      this.loadAddresses();
    });

    this.addressForm = this.fb.group({
      type: ['', Validators.required],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  loadAddresses(): void {
    this.addressService.getAddressesByClientId(this.clientId).subscribe((data) => {
      this.addresses = data;
    });
  }

  addAddress(): void {
    if (this.addressForm.valid) {
      const newAddress: Address = {
        addressId: 0,
        clientId: this.clientId,
        addressType: this.addressForm.value.type,
        addressLine: this.addressForm.value.addressLine,
        city: this.addressForm.value.city,
        state: this.addressForm.value.state,
        postalCode: this.addressForm.value.postalCode
      };

      this.addressService.addAddress(newAddress).subscribe(() => {
        this.loadAddresses(); 
        this.addressForm.reset(); 
        this.router.navigate([`/contact-info/${this.clientId}`]);
      });
    } 
  }

  updateAddress(addressId: number): void {
    if (this.addressForm.valid) {
      const updatedAddress: Address = {
        addressId,
        clientId: this.clientId,
        addressType: this.addressForm.value.type,
        addressLine: this.addressForm.value.addressLine,
        city: this.addressForm.value.city,
        state: this.addressForm.value.state,
        postalCode: this.addressForm.value.postalCode
      };

      this.addressService.updateAddress(addressId, updatedAddress).subscribe(() => {
        this.loadAddresses(); 
      });
    }
  }

  deleteAddress(addressId: number): void {
    this.addressService.deleteAddress(addressId).subscribe(() => {
      this.loadAddresses(); 
    });
  }
}


