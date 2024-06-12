import { IOrderProducts } from './IOrderProducts';

export interface IOrder {
    cliente_id: number;
    productos: IOrderProducts[];   
    precio_total: number;
}
