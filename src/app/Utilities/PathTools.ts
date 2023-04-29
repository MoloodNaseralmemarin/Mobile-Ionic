import { environment } from '../../environments/environment';

export const DomainName = environment.production ? 'https://apidr.shop2city.ir' : 'https://localhost:44309';
export const ImagePath = DomainName + '/images/products/origin/';
export const ImageGalleryPath = DomainName + '/images/product-galleries/';
