import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactInfoService, ContactInfo } from '../../services/contact-info.service';

@Component({
  selector: 'app-add-contact-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-contact-info.component.html',
  styleUrls: ['./add-contact-info.component.css']
})
export class AddContactInfoComponent implements OnInit {
  clientId!: number;
  contactInfoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactInfoService: ContactInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clientId = +params.get('clientId')!;
    });

    this.contactInfoForm = this.fb.group({
      workNumber: ['', Validators.required],
      cellNumber: ['', Validators.required],
      workEmail: ['', [Validators.required, Validators.email]]
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
  
      this.contactInfoService.addContactInfo(newContactInfo).subscribe((createdContactInfo: ContactInfo) => {
        this.contactInfoForm.reset();
        this.router.navigate(['/']);
      });
    }
  }
  
}

