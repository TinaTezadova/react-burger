import { IOrdersData } from '../../../types/type';
export type TWebSocketState = {
    connectedSuccess: boolean,
    errorInfo: any,
    ordersData: IOrdersData,
}