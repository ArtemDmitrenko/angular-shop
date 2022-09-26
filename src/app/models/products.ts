import { IProduct } from './product';

export interface IProducts {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}
