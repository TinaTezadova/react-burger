import { IOrdersData } from '../../../types/type';
export type TWebSocketState = {
    connectedSuccess: boolean,
    errorInfo: string | null,
    ordersData: IOrdersData,
}