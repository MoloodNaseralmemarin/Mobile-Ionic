import { Product } from './Product';
import { ProductsOrderBy } from './ProductsOrderBy';

export class FilterProductsViewModel {
  constructor(
    public title: string = '',
    public startPrice: number,
    public endPrice: number,
    public pageId: number,
    public pageCount: number,
    public startPage: number,
    public endPage: number,
    public takeEntity: number,
    public skipEntity: number,
    public activePage: number,
    public orderBy: ProductsOrderBy = null,
    public categories: number[],
    public products: Product[]
  ) {
  }
}
