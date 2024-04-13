import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './Chart.module.scss'
import { Card } from '../index';
import { Bar } from 'react-chartjs-2'
import { selectOrderHistory } from '../../redux/slice/orderSlice';
import { useSelector } from 'react-redux';
import useFetchCollection from '../../customHooks/useFetchCollection';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory)

  const { data, isLoading } = useFetchCollection("orders");
  console.log(data)

  console.log(orders)

  //create a new array of order status
  const array = [];
  data.map((item) => {
    const { orderStatus } = item;
    return array.push(orderStatus);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };
  const x = getOrderCount(array,'Order Placed...')

  const [q1,q2,q3,q4] = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ]

  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const shipped = getOrderCount(array, q3);
  const delivered = getOrderCount(array, q4);

  const data1 = {
    labels: ['Placed Order','Processing','Shipped','Delivered'],
    datasets: [
      {
        label: 'Order Count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className={styles.charts}>
        <Card cardClass={styles.card}>
          <h3>Order Status Chart</h3>
          <Bar options={options} data={data1} />
        </Card>
    </div>
    )
}

export default Chart