import { Component, Inject } from '@angular/core';

import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { CurrentUser } from './DTOs/Account/CurrentUser';
import { Capacitor } from '@capacitor/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  user: CurrentUser = null;

  constructor(
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private router: Router
  ) {
    this.document.documentElement.dir = 'rtl';
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.authService.checkUserAuth().subscribe(res => {
        if (res.status === 'Success') {
          const user = new CurrentUser(
            res.data.userId,
            res.data.firstName,
            res.data.lastName,
            res.data.address);
          this.authService.setCurrentUser(user);
        }
      });

      this.authService.getCurrentUser().subscribe(user => {
        this.user = user;
      });

    });
  }

  logOutUser() {
    Preferences.remove({ key: 'eshop-cookie' }).then(res => {
      this.authService.setCurrentUser(null);
      this.router.navigate(['/']);
    });
  }
}
