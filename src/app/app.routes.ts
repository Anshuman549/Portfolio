import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactFormComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: 'contact', component: ContactFormComponent },
    { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}