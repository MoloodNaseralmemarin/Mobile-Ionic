import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { ProductCategory } from '../DTOs/Products/ProductCategory';
import { FilterProductsViewModel } from '../DTOs/Products/FilterProductsViewModel';
import { ProductDetailViewModel } from './../DTOs/Products/ProductDetailViewModel';
import { Product } from '../DTOs/Products/Product';
import { ProductCommentViewModel } from '../DTOs/Products/ProductCommentViewModel';
import { AddProductComment } from './../DTOs/Products/AddProductComment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient
  ) {
  }

  getFilteredProducts(filter: FilterProductsViewModel): Observable<IResponseResult<FilterProductsViewModel>> {
    let params = new HttpParams();
    if (filter !== null) {
      params = new HttpParams()
        .set('pageId', filter.pageId.toString())
        .set('title', filter.title)
        .set('startPrice', filter.startPrice.toString())
        .set('endPrice', filter.endPrice.toString())
        .set('orderBy', filter.orderBy.toString())
        .set('takeEntity', filter.takeEntity.toString());
      for (const category of filter.categories) {
        params = params.append('categories', category.toString());
      }
      if (filter.orderBy != null) {
        params = params.append('orderBy', filter.orderBy.toString());
      }
    }
    return this.http.get<IResponseResult<FilterProductsViewModel>>('/products/filter-products', { params });
  }

  getProductActiveCategories(): Observable<IResponseResult<ProductCategory[]>> {
    return this.http.get<IResponseResult<ProductCategory[]>>('/products/product-active-categories');
  }

  getSingleProduct(productId: number): Observable<IResponseResult<ProductDetailViewModel>> {
    return this.http.get<IResponseResult<ProductDetailViewModel>>('/products/single-product/' + productId);
  }

  getRelatedProducts(productId: number): Observable<IResponseResult<Product[]>> {
    return this.http.get<IResponseResult<Product[]>>('/products/related-products/' + productId);
  }
  getProductComments(productId: number): Observable<IResponseResult<ProductCommentViewModel[]>> {
    return this.http.get<IResponseResult<ProductCommentViewModel[]>>('/products/product-comments/' + productId);
  }
  addProductComment(comment: AddProductComment): Observable<IResponseResult<ProductCommentViewModel>> {
    return this.http.post<IResponseResult<ProductCommentViewModel>>('/products/add-product-comment', comment);
  }
}
