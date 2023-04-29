import {Component, OnInit, ViewChild} from '@angular/core';
import {CurrentUser} from '../../../DTOs/Account/CurrentUser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import { EditUserViewModel } from '../../../DTOs/Account/EditUserViewModel';
import {AlertController, LoadingController} from '@ionic/angular';


@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.page.html',
    styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

    editUser: FormGroup;
    currentUser: CurrentUser;

    constructor(
        private authService: AuthService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController
    ) {
    }

    ngOnInit(): void {

        this.authService.getCurrentUser().subscribe(res => {
            this.currentUser = res;

            this.editUser = new FormGroup({
                firstName: new FormControl(
                    res.firstName,
                    [
                        Validators.required,
                        Validators.maxLength(100)
                    ]
                ),
                lastName: new FormControl(
                    res.lastName,
                    [
                        Validators.required,
                        Validators.maxLength(100)
                    ]),
                address: new FormControl(
                    res.address,
                    [
                        Validators.required,
                        Validators.maxLength(500)
                    ])
            });
        });
    }

    submitEditUserForm() {
        if (this.editUser.valid) {
            const loading = this.loadingCtrl.create({
                message: 'در حال ارسال اطلاعات'
            });

            loading.then(loadingEl => {
                loadingEl.present();
            });
            const user = new EditUserViewModel(
                this.editUser.controls.firstName.value,
                this.editUser.controls.lastName.value,
                this.editUser.controls.address.value
            );
            this.authService.editUserAccount(user).subscribe(res => {
                loading.then(loadingEl => {
                    loadingEl.dismiss();
                });
                if (res.status === 'Success') {
                    this.alertCtrl.create({
                        header: 'اعلان',
                        message: res.data.message,
                        buttons: ['باشه']
                    }).then(alertEl => {
                        alertEl.present();
                    });
                    this.authService.setCurrentUser(new CurrentUser(
                        this.currentUser.userId,
                        user.firstName,
                        user.lastName,
                        user.address
                    ));
                }
            });
        } else {
            this.editUser.markAllAsTouched();
        }
    }

}
