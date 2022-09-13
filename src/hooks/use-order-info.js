import { useEffect, useMemo, useState } from "react";
import { orderStatuses } from '../utils/consts';

export const useOrderInfo = (orderStatus, date, ingredients) => {
  const [statusText, setStatusText] = useState(null);
  const [orderDate, setOrderDate] = useState('');
  const [totalAmout, setTotalAmout] = useState(0)
  const orderCreatedDate = new Date(Date.parse(date));


  const statusInfo = useMemo(() => {
    switch (orderStatus) {
      case orderStatuses.created:
        return 'Создан';
      case orderStatuses.pending:
        return 'Готовится';
      case orderStatuses.done:
        return 'Выполнен';
      default:
        return orderStatus;
    }
  }, [orderStatus]);

  const formatDate = () => {
    const currentDate = new Date().setHours(24, 0, 0, 0);
    const differenceDaysCount = Math.floor((currentDate - orderCreatedDate) / (60000 * 60 * 24));
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

  const formatedDate = useMemo(() => {
    return `${formatDate(date)}, ${orderCreatedDate.getHours()}:${orderCreatedDate.getMinutes()} i-GMT+3`;
  }, [date]);

  const totalAmoutInfo = useMemo(() => {
    let sum = 0;
    ingredients.forEach((item) => sum += item.price);
    return sum
  }, [])


  useEffect(() => {
    setStatusText(statusInfo);
    setOrderDate(formatedDate);
    setTotalAmout(totalAmoutInfo);
  }, [statusInfo, formatedDate, totalAmoutInfo]);

  return { statusText, orderDate, totalAmout };
};