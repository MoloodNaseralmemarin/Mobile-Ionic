import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageGalleryPath, ImagePath} from '../../../../Utilities/PathTools';
import { ProductDetailViewModel } from '../../../../DTOs/Products/ProductDetailViewModel';
import { AlertController } from '@ionic/angular';
import { OrderService } from '../../../../services/order.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  productDetail: ProductDetailViewModel = null;
  imagePath = ImagePath;
  imageGalleryPath = ImageGalleryPath;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const productId = parseInt(params.productId, 0);
      this.productService.getSingleProduct(productId).subscribe((res) => {
        if (res.status === 'Success') {
          this.productDetail = res.data;
        } else {
          this.router.navigate(['/home', 'products']);
        }
      });
    });
  }

  addProductToOrder() {
    this.orderService
      .addProductToOrder(this.productDetail.product.id, 1)
      .subscribe((res) => {
        this.orderService._setOrderDetails(res.data.details);

        this.alertCtrl
          .create({
            header: 'اعلان',
            message: 'محصول مورد نظر به سبد خرید شما اضافه شد',
            buttons: ['باشه'],
          })
          .then((alertEl) => {
            alertEl.present();
          });
      });
  }
}
