import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { profileApiservive } from '../apiService';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const HorizontalChart: React.FC = () => {
  const token = useSelector((state: any) => state.auth.token.access);
  const [data, setData] = useState({
    labels: ['  ', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(25, 90, 13, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = "http://localhost:8000/app2/ManageListingView/";
      try {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
        const dataSet1: any[] = [];
        const dataSet2: any[] = [];
        console.log(response)
        console.log(response.data)
        for (const val of response.data.results.data) {
          dataSet1.push(val.id);
          dataSet2.push(val.country);
        }
        setData({
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          datasets: [
            {
              label: 'Dataset ID',
              data: dataSet1,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(99, 132, 0.5)',
            },
            {
              label: 'Dataset ID2',
              data: dataSet2,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 235, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div style={{ width: '80%', height: '50%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalChart;
