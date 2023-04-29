import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginUserViewModel } from '../../../DTOs/Account/LoginUserViewModel';
import { CurrentUser } from '../../../DTOs/Account/CurrentUser';
import { Preferences } from '@capacitor/preferences';
import { LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  public loginForm: FormGroup;


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,

  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
    });
  }
  submitLoginForm() {
    if (this.loginForm.valid) {
      const loginData = new LoginUserViewModel(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value
      );

      const loading = this.loadingCtrl.create({
        message: 'در حال ارسال اطلاعات'
      });

      loading.then(loadingEl => {
        loadingEl.present();
      });

      this.authService.loginUser(loginData).subscribe(res => {
        loading.then(el => {
          el.dismiss();
        });
        const alert = this.alertCtrl.create({
          header: 'اعلان',
          message: '',
          buttons: [
            'باشه'
          ]
        });
        const currentUser = new CurrentUser(
          res.data.userId,
          res.data.firstName,
          res.data.lastName,
          res.data.address
        );


        if (res.status === 'Success') {
          //Error 56
          //Capacitor.Plugins.strong.set({ key: 'eshop-cookie', value: res.data.token });

             Preferences.set({
              key: 'eshop-cookie',
              value: res.data.token,
            });


         // set(options: SetOptions) => Promise<void>
          console.log(
            Preferences.set({
             key: 'eshop-cookie',
             value: res.data.token,
           })
);
          this.authService.setCurrentUser(currentUser);
          this.loginForm.reset();
          alert.then(alertEl => {
            alertEl.message = 'ورود شما با موفیت انجام شد';
            alertEl.present();
          });
          this.router.navigate(['/']);
        } else if (res.status === 'Error') {
          alert.then(alertEl => {
            alertEl.message = 'عملیات مورد نظر با شکست مواجه شد';
            alertEl.present();
          });
        } else if (res.status === 'NotFound') {
          alert.then(alertEl => {
            alertEl.message = 'کاربری با مشخصات وارد شده یافت نشد';
            alertEl.present();
          });
        }
      });
    }
  }
}

