import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  isLoggedIn: boolean = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private readonly contextService: ContextService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{2,10}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/products']);
    }
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        this.isLoggedIn = true;
        this.contextService.setLogIn(true);
        this.router.navigate(['/products']);
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
      },
    });
  }
}
