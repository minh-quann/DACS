import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/GoHomeButton.css'

const GoHomeButton = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <button onClick={handleGoHome} className="go-home-button">
            Go Home
        </button>
    );
};

export default GoHomeButton;
