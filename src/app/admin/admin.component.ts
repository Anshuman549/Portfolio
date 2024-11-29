import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {




  ngOnInit(): void {
  }




  loginForm: FormGroup;
  otpForm: FormGroup;
  otpSent = false;
  isLoggedIn = false;
  contacts: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  sendOtp(): void {
    const email = this.loginForm.get('email')?.value;
    this.http.post('http://localhost:3000/admin/login', { email }).subscribe(
      () => {
        this.otpSent = true;
        alert('OTP sent to your email.');
      },
      error => {
        console.error('Error sending OTP:', error);
      }
    );
  }

  verifyOtp(): void {
    const email = this.loginForm.get('email')?.value;
    const otp = this.otpForm.get('otp')?.value;

    this.http.post('http://localhost:3000/admin/verify-otp', { email, otp }).subscribe(
      () => {
        this.isLoggedIn = true;
        alert('Welcome Sir,Here is your Request.');
        this.fetchContacts();
      },
      error => {
        console.error('OTP verification failed:', error);
        alert('Invalid OTP. Please try again.');
      }
    );
  }

  fetchContacts(): void {
    this.http.get('http://localhost:3000/admin/contacts').subscribe(
      (data: any) => {
        this.contacts = data;
      },
      error => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
}