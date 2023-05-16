import React from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';

const DataExportButton = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/purchases'); // Replace '/api/data' with your actual API endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <CSVLink data={data} filename="data_export.csv">
      Export Data
    </CSVLink>
  );
};

export default DataExportButton;