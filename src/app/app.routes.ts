import { Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AddressComponent } from './components/address/address.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AddContactInfoComponent } from './components/add-contact-info/add-contact-info.component';

export const routes: Routes = [
  { path: '', redirectTo: '/client-list', pathMatch: 'full' },
  { path: 'client-list', component: ClientListComponent },
  { path: 'add-client', component: AddClientComponent },
  { path: 'address/:clientId', component: AddressComponent },
  { path: 'contact-info/:clientId', component: ContactInfoComponent },
  { path: 'add-address/:clientId', component: AddAddressComponent },
  { path: 'add-contact-info/:clientId', component: AddContactInfoComponent },
];