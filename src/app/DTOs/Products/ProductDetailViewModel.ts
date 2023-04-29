import {Product} from './Product';
import {ProductGallery} from './ProductGallery';

export class ProductDetailViewModel {
  constructor(
    public product: Product,
    public galleries: ProductGallery[]
  ) {
  }
}
