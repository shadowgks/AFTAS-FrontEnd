import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticatorService } from 'src/app/core/services/authenticator.service';
import { NgClass, NgIf } from '@angular/common';
import { User } from 'src/app/shared/models/user';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        AngularSvgIconModule,
        NgClass,
        NgIf
    ],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  error = '';

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private _serviceAuth: AuthenticatorService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }else{
      this._serviceAuth.register(this.form.value).subscribe({
          next: () => {
            this._router.navigate(['/auth/sign-in']);
          },
          error: error => {
            this.error = error ? error : '';
          }
        });
    }
  }
}
