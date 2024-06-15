import React from 'react';
import { useLocation } from 'react-router-dom';
import DisplayResult from './DisplayResult';

const Result = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div>
      <h1>Search Results</h1>
      <DisplayResult data={data} />
    </div>
  );
};

export default Result;
