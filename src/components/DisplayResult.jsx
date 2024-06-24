import React from 'react';
import StarRating from './StarRating';
import '../css/DisplayResult.css';
import GoHomeButton from './GoHomeButton';

function DisplayResult({ data }) {
  if (!data || data.length === 0) {
    return <p>No data to display</p>;
  }

  return (
    <div className="display-data">
        {data.map((data, index) => (
            <div key={index} className="data-card">
              <p className="result">{data.result}</p>
              <StarRating rating={data.avg_rating} />
              <p className="point">Điểm phân tích bình luận: {data.pos_ratio}/1₫</p>
              <p className="note">* Lưu ý: Kết quả được dựa trên các bình luận gần nhất.
                <span class="newline">Quyết định cuối cùng vẫn là ở bạn!</span>
              </p>
              <GoHomeButton />
            </div>
            
        ))}

    </div>
  );
}

export default DisplayResult;
