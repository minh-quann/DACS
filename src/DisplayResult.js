import React from 'react';
import './SearchBar.css';

function ResultDisplay({ data }) {
  if (!data) {
    return <p>No data to display</p>;
  }

  return (
    <div className="display-data">
        {data.map((data, index) => (
            <p key={index}>Số sao trung bình: {data.avg_rating}</p>
        ))}
        {data.map((data, index) => (
            <p key={index}>Điểm phân tích bình luận: {data.pos_ratio}</p>
        ))}
        {data.map((data, index) => (
            <p key={index}>Kết luận: {data.result}</p>
        ))}

    </div>
  );
}

export default ResultDisplay;
