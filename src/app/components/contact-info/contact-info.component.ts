import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute
import { ContactInfoService, ContactInfo } from '../../services/contact-info.service';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  clientId!: number;
  contactInfoForm!: FormGroup;
  contactInfos: ContactInfo[] = [];

  constructor(
    private fb: FormBuilder,
    private contactInfoService: ContactInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clientId = +params.get('clientId')!;
      this.loadContactInfos();
    });

    this.contactInfoForm = this.fb.group({
      workNumber: ['', Validators.required],
      cellNumber: ['', Validators.required],
      workEmail: ['', [Validators.required, Validators.email]]
    });
  }

  loadContactInfos(): void {
    this.contactInfoService.getContactInfosByClientId(this.clientId).subscribe((data) => {
      this.contactInfos = data;
    });
  }

  addContactInfo(): void {
    if (this.contactInfoForm.valid) {
      const newContactInfo: ContactInfo = {
        contactInfoId: 0,
        clientId: this.clientId,
        workNumber: this.contactInfoForm.value.workNumber,
        cellNumber: this.contactInfoForm.value.cellNumber,
        workEmail: this.contactInfoForm.value.workEmail,
      };

      this.contactInfoService.addContactInfo(newContactInfo).subscribe(() => {
        this.loadContactInfos();
        this.contactInfoForm.reset();
        this.router.navigate(['/']);
      });
    }
  }

  updateContactInfo(contactInfoId: number): void {
    if (this.contactInfoForm.valid) {
      const updatedContactInfo: ContactInfo = {
        contactInfoId,
        clientId: this.clientId,
        workNumber: this.contactInfoForm.value.workNumber,
        cellNumber: this.contactInfoForm.value.cellNumber,
        workEmail: this.contactInfoForm.value.workEmail,
      };

      this.contactInfoService.updateContactInfo(contactInfoId, updatedContactInfo).subscribe(() => {
        this.loadContactInfos();
      });
    }
  }

  deleteContactInfo(contactInfoId: number): void {
    this.contactInfoService.deleteContactInfo(contactInfoId).subscribe(() => {
      this.loadContactInfos();
    });
  }
}



