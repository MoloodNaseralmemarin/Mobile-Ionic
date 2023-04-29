import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { OrderBasketDetail } from '../../../DTOs/Orders/OrderBasketDetail';
import { ImagePath } from 'src/app/Utilities/PathTools';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  orderBasketDetails: OrderBasketDetail[] = [];
  imagePath = ImagePath;

  constructor(
    private orderService: OrderService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.orderService.getUserBasketDetails().subscribe((res) => {
      if (res.status === 'Success') {
        this.orderBasketDetails = res.data;
      }
    });
  }

  openActionSheet(detailId: number) {
    this.actionSheetCtrl
      .create({
        header: 'دستورات',
        buttons: [
          {
            icon: 'trash-outline',
            text: 'حذف کردن',
            handler: () => {
              this.orderService.removeOrderDetail(detailId).subscribe(res => {
                if (res.status === 'Success') {
                  this.orderService._setOrderDetails(res.data);
                  this.orderBasketDetails = res.data;
                }
              });
            }
          }
        ],
      })
      .then((actionEl) => {
        actionEl.present();
      });
  }
}
