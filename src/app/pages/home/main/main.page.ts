import { Component, OnInit } from '@angular/core';
import { ImagePath } from 'src/app/Utilities/PathTools';
import { FilterProductsViewModel } from '../../../DTOs/Products/FilterProductsViewModel';
import { ProductsService } from '../../../services/products.service';
import { ProductsOrderBy } from '../../../DTOs/Products/ProductsOrderBy';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  imagePath = ImagePath;
  filterProducts: FilterProductsViewModel = new FilterProductsViewModel(
    '', 1, 0, 1, 0, 1, 0, 10, 0, 0, ProductsOrderBy.CreateDateDes, [], []
  );

  specialProducts: FilterProductsViewModel = new FilterProductsViewModel(
    '', 0, 0, 1, 0, 1, 0, 10, 0, 0, ProductsOrderBy.IsSpecial, [], []
  );

  constructor(
    private productService: ProductsService
  ) {
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.2,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  specialSlideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.5,
    spaceBetween: 10,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  ngOnInit() {
    this.productService.getFilteredProducts(this.filterProducts).subscribe(res => {
      this.filterProducts = res.data;
    });

    this.productService.getFilteredProducts(this.specialProducts).subscribe(res => {
      this.specialProducts = res.data;
    });
  }
}
