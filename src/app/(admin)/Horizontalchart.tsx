'use client'

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
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalChart: React.FC = () => {
  const token = useSelector((state: any) => state.auth.token.access);
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels: ['Bungalow', 'Colonial', 'Flat', 'Cottage', 'Rowhouse'], 
    datasets: [
      {
        label: 'Number of Properties',
        data: [],
        borderColor: 'rgb(70, 130, 180)', 
        backgroundColor: 'rgba(70, 130, 180, 0.5)', 
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = "http://localhost:8000/app2/ManageListingView/";
      try {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
        const counts: Record<string, number> = {
          bungalow: 0,
          colonial: 0,
          flat: 0,
          cottage: 0,
          rowhouse: 0,
        };

        for (const val of response.data.results.data) {
          counts[val.home_type.toLowerCase()]++;
        }

        const dataValues = Object.values(counts);

        setData({
          labels: ['Bungalow', 'Colonial', 'Flat', 'Cottage', 'Rowhouse'], 
          datasets: [
            {
              label: 'Number of Properties',
              data: dataValues,
              borderColor: 'rgb(70, 130, 180)', 
              backgroundColor: 'rgba(70, 130, 180, 0.5)', 
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
    <div style={{ width: '100%', height: '400px' }} className='flex justify-center mt-8'> 
      <Bar 
        data={data} 
        options={{
          indexAxis: 'x',
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
              text: 'Number of Properties by Type',
            },
          },
        }} 
      />
    </div>
  );
};

export default HorizontalChart;
