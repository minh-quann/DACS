import React, { useState } from 'react';
import './SearchBar.css';
 
const SearchBar = ({ onFetchData }) => {
  const [url, setUrl] = useState('');
 
  const handleSubmit = (event) => {
    event.preventDefault();
    onFetchData(url);
  };
 
  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Tên sản phẩm hoặc link URL"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
 
export default SearchBar;