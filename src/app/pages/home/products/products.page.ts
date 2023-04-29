import { Component, OnInit } from '@angular/core';
import { ImagePath } from '../../../Utilities/PathTools';
import { ProductCategory } from '../../../DTOs/Products/ProductCategory';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterProductsViewModel } from '../../../DTOs/Products/FilterProductsViewModel';
import { ProductsOrderBy } from '../../../DTOs/Products/ProductsOrderBy';
import { Product } from '../../../DTOs/Products/Product';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  imagePath = ImagePath;
  filterProducts: FilterProductsViewModel = new FilterProductsViewModel(
    '', 0, 0, 1, 0, 0, 0, 6, 0, 0, ProductsOrderBy.CreateDateDes, [], []
  );
  isLoading = true;
  pages: number[] = [];
  categories: ProductCategory[] = [];
  page = 1;
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private menu: MenuController
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let pageId = 1;
      if (params.pageId !== undefined) {
        pageId = parseInt(params.pageId, 0);
      }
      this.filterProducts.categories = params.categories ? params.categories : [];
      this.filterProducts.pageId = pageId;
      this.filterProducts.startPrice = params.startPrice ? params.startPrice : 0;
      this.filterProducts.endPrice = params.endPrice ? params.endPrice : 0;
      this.getProducts();
    });

    this.productsService.getProductActiveCategories().subscribe(res => {
      if (res.status === 'Success') {
        this.categories = res.data;
      }
    });
  }

  openFilterProductsMenu() {
    this.menu.enable(true, 'filter_products');
    this.menu.open('filter_products');
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  setMinPrice(event: any) {
    if (event.detail.value !== null && event.detail.value !== '') {
      this.filterProducts.startPrice = parseInt(event.detail.value, 0);
    } else {
      this.filterProducts.startPage = 0;
    }
  }

  setMaxPrice(event: any) {
    if (event.detail.value !== null && event.detail.value !== '') {
      this.filterProducts.endPrice = parseInt(event.detail.value, 0);
    } else {
      this.filterProducts.endPrice = 0;
    }
  }

  filterButton() {
    this.products = [];
    this.router.navigate(
      ['home', 'products'], {
        queryParams: {
          categories: this.filterProducts.categories,
          startPrice: this.filterProducts.startPrice,
          endPrice: this.filterProducts.endPrice
        }
      }
    );
  }

  changeOrder(event: any) {
    this.getProducts();

    switch (event.target.value) {
      case ProductsOrderBy.PriceAsc.toString():
        this.router.navigate(['home', 'products'], {
          queryParams: {
            pageId: this.filterProducts.activePage,
            categories: this.filterProducts.categories,
            orderBy: 'priceAsc',
            startPrice: this.filterProducts.startPrice,
            endPrice: this.filterProducts.endPrice
          }
        });
        break;
      case ProductsOrderBy.PriceDes.toString():
        this.router.navigate(['home', 'products'], {
          queryParams: {
            pageId: this.filterProducts.activePage,
            categories: this.filterProducts.categories,
            orderBy: 'priceDes',
            startPrice: this.filterProducts.startPrice,
            endPrice: this.filterProducts.endPrice
          }
        });
        break;
    }
  }

  filterCategories(event: any) {
    const value = event.target.value;
    if (this.filterProducts.categories === undefined || this.filterProducts.categories === null) {
      this.filterProducts.categories = [];
    }
    if (event.target.checked) {
      this.filterProducts.categories.push(parseInt(value, 0));
      this.setCategoriesFilter();
    } else {
      this.filterProducts.categories = this.filterProducts.categories.filter(s => s !== parseInt(value, 0));
      this.setCategoriesFilter();
    }
  }

  setCategoriesFilter() {
    if (this.filterProducts.categories.length > 0) {
      this.router.navigate(['products'], { queryParams: { categories: this.filterProducts.categories } });
    } else {
      this.router.navigate(['products']);
    }
  }

  setPage(page: number) {
    this.router.navigate(
      ['products'], {
        queryParams: {
          pageId: page,
          categories: this.filterProducts.categories,
          startPrice: this.filterProducts.startPrice,
          endPrice: this.filterProducts.endPrice
        }
      });
  }

  getProducts() {
    if (this.filterProducts.pageId <= this.filterProducts.endPage || this.filterProducts.pageId === 1) {
      this.productsService.getFilteredProducts(this.filterProducts).subscribe(res => {
        this.filterProducts = res.data;
        this.products.push(...res.data.products);
        if (res.data.title === null) {
          this.filterProducts.title = '';
        }
        this.isLoading = false;
        this.pages = [];
        if (res.data.categories === null) {
          this.filterProducts.categories = [];
        }

        for (let i = this.filterProducts.startPage; i <= this.filterProducts.endPage; i++) {
          this.pages.push(i);
        }
      });
    }
  }

  loadData(event: any) {
    this.filterProducts.pageId += 1;
    this.getProducts();
    event.target.complete();
  }
}
