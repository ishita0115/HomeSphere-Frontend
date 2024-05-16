// pages/index.js
import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import axios from 'axios';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/app2/listinglist/') // Replace with your actual API endpoint
        const result =  response.json();
        setData(result);
        setSortedData(result); // Initialize sortedData with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sortData = () => {
      let sorted = [...data];
      if (sortOption === 'min-max') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'max-min') {
        sorted.sort((a, b) => b.price - a.price);
      }
      setSortedData(sorted);
    };

    sortData();
  }, [sortOption, data]);

  return (
    <div>
      <h1>Data List</h1>
      <Categories setSortOption={setSortOption} />
      <div>
        {sortedData.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
