import React, { useState } from "react";
import "./SearchBar.css";
import shopeeLogo from "./icon/sp.png"; // Điều chỉnh đường dẫn cần thiết
import amazonLogo from "./icon/a.png";
import lazadaLogo from "./icon/lz.png";
import tikiLogo from "./icon/tk.png";

const SanTM = () => {
  const [options, setOptions] = useState([
    {
      id: 1,
      text: "Amazon",
      votes: 0,
      logo: amazonLogo,
    },
    {
      id: 2,
      text: "Shopee",
      logo: shopeeLogo,
    },
    {
      id: 3,
      text: "Lazada",
      votes: 0,
      logo: lazadaLogo,
    },
    {
      id: 4,
      text: "TikiTiki",
      votes: 0,
      logo: tikiLogo,
    },
  ]);

  const [selectedOption, setSelectedOption] = useState(null); // Lưu trữ option được chọn
  const [modalContent, setModalContent] = useState(null); // Lưu trữ nội dung của modal

  const handleVote = (id) => {
    if (id !== 1) {
      const clickedOption = options.find((option) => option.id === id);
      if (clickedOption && clickedOption.link) {
        window.location.href = clickedOption.link;
      } else {
        if (clickedOption) {
          setSelectedOption(clickedOption); // Thiết lập option được chọn
          // Đặt nội dung modal là "đang phát triển"
          setModalContent(<p style={{ textAlign: 'center' }}>Đang phát triển...</p>);
          
        } else {
          const updatedOptions = options.map((option) =>
            option.id === id ? { ...option, votes: option.votes + 1 } : option
          );
          setOptions(updatedOptions);
          console.log("Kết quả bình chọn:", updatedOptions);
        }
      }
    }
  };

  const closeModal = () => {
    setSelectedOption(null); // Đóng modal bằng cách xóa option được chọn
    setModalContent(null); // Xóa nội dung của modal
  };

  return (
    <div className="san-tm">
      <h2>E-commerce</h2>
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            <button
              className={`option-button option-${option.text.toLowerCase()}`}
              onClick={() => handleVote(option.id)}
            >
              {option.logo && (
                <img
                  src={option.logo}
                  alt={`${option.text} Logo`}
                  className="option-logo"
                />
              )}
              {option.text}
            </button>
          </li>
        ))}
      </ul>
      {selectedOption && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            zIndex: 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
              width: "20%",
              height: "12%", // Điều chỉnh chiều cao tại đây
              position: "relative",
              animation: "zoomIn 0.3s ease-in-out",
          
            }}
          >
            <span
              className="close"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "#aaa",
                fontSize: "24px",
                cursor: "pointer",
              }}
              onClick={closeModal}
            >
              &times;
            </span>
            <h3>{selectedOption.text}</h3>
            {modalContent}
            <button
              onClick={closeModal}
              style={{
                marginTop: "130px",
                padding: "20px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "15px",
                cursor: "pointer",
                display: "block",
                margin: "0 auto",
              }}
            >
              Quay lại
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default SanTM;
