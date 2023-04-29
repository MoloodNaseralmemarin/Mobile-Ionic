import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CurrentUser } from '../../DTOs/Account/CurrentUser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: CurrentUser = null;
  constructor(
    private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((res) => {
      this.user = res;
    });
  }
}
