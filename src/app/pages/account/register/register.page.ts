import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RegisterUserViewModel } from '../../../DTOs/Account/RegisterUserViewModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ),
      username: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ),
      firstName: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ),
      lastName: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      confirmPassword: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      address: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(500)
        ])
    });
  }

  submitRegisterForm() {
    const loading = this.loadingCtrl.create({
      message: 'در حال ارسال اطلاعات',
    });

    loading.then(element => {
      element.present();
    });
    const registerData = new RegisterUserViewModel(
      this.registerForm.controls.email.value,
      this.registerForm.controls.username.value,
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.confirmPassword.value,
      this.registerForm.controls.address.value,
    );

    this.authService.registerUser(registerData).subscribe(res => {
      loading.then(element => {
        element.dismiss();
      });
      if (res.status === 'Success') {
        this.alertCtrl.create({
          header: 'اعلان',
          buttons: ['باشه']
        }).then(alertEl => {
          alertEl.message = 'ثبت نام شما با موفقیت انجام شد';
          alertEl.present();
        });
        this.registerForm.reset();
        this.router.navigate(['/account/login']);
      }
      if (res.status === 'Error') {
        if (res.data.info === 'EmailExist') {
          this.alertCtrl.create({
            header: 'اعلان',
            buttons: ['باشه']
          }).then(alertEl => {
            alertEl.message = 'ایمیل وارد شده تکراری می باشد';
            alertEl.present();
          });
        }
        if (res.data.info === 'UserNameExist') {
          this.alertCtrl.create({
            header: 'اعلان',
            buttons: ['باشه']
          }).then(alertEl => {
            alertEl.message = 'نام کاربری وارد شده تکراری می باشد';
            alertEl.present();
          });
        }
      }
    });
  }

}
