import { IUserProducts } from './IUserProducts';

export interface IUserOrders{
    fecha: Date;
    pedido_id: number;
    precio_total: number;
    productos: IUserProducts[]; 
}