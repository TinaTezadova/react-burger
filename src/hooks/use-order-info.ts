import { useEffect, useMemo, useState } from "react";
import { orderStatuses } from '../utils/consts';
import { TOrderStatuses, IIngredientItemWithQuantity } from '../types/type';

interface IOrderInfoResult {
  statusText: string,
  orderDate: string,
  totalAmout: number
}

export const useOrderInfo = (orderStatus?: TOrderStatuses, date?: string, ingredients?: Array<IIngredientItemWithQuantity>): IOrderInfoResult => {
  const [statusText, setStatusText] = useState<string>('');
  const [orderDate, setOrderDate] = useState<string>('');
  const [totalAmout, setTotalAmout] = useState<number>(0)
  const orderCreatedDate: Date = new Date(Date.parse(date || ''));
  


  const statusInfo = useMemo((): string => {
    switch (orderStatus) {
      case orderStatuses.created:
        return 'Создан';
      case orderStatuses.pending:
        return 'Готовится';
      case orderStatuses.done:
        return 'Выполнен';
      default:
        return orderStatus || '';
    }
  }, [orderStatus]);

  const formatDate = (): string => {
    const currentDate: number = new Date().setHours(24, 0, 0, 0);
    const orderCreatedDateToNum: number = orderCreatedDate.setHours(24, 0, 0, 0)
    
    const differenceDaysCount: number = Math.floor((currentDate - orderCreatedDateToNum) / (60000 * 60 * 24));
    
    const getLastDayNumber = () => {
      const numToStr = String(differenceDaysCount)
      return Number(numToStr.split('')[numToStr.length - 1])
    }

    if (differenceDaysCount === 0) {
      return 'Сегодня';
    }
    else if (differenceDaysCount === 1) {
      return 'Вчера';
    }
    else if (differenceDaysCount > 20 && getLastDayNumber() === 1) {
      return `${differenceDaysCount} день назад`;
    }
    else if (differenceDaysCount > 20 && getLastDayNumber() > 1 && getLastDayNumber() < 5) {
      return `${differenceDaysCount} дня назад`;
    }
    else {
      return `${differenceDaysCount} дней назад`;
    }
  };

  const formatedDate = useMemo((): string => {
    return `${formatDate()}, ${orderCreatedDate.getHours()}:${orderCreatedDate.getMinutes()} i-GMT+3`;
  }, [date]);

  const totalAmoutInfo = useMemo(() => {
    let sum = 0;
    ingredients?.forEach((item) => sum += item.price * item.quantity);
    return sum
  }, [])


  useEffect(() => {
    setStatusText(statusInfo);
    setOrderDate(formatedDate);
    setTotalAmout(totalAmoutInfo);
  }, [statusInfo, formatedDate, totalAmoutInfo]);

  return { statusText, orderDate, totalAmout };
};