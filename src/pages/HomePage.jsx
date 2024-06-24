import React, {useState} from 'react';
import SearchBar from '../components/SearchBar';
import EcommercePlatform from '../components/EcommercePlatform';
import HowToUse from '../components/HowToUse';
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:5000/crawl_and_analyze_comments', {
        params: { url }
      });
      const response_info = await axios.get('http://127.0.0.1:5000/get_product_information', {
        params: { url }
      });
      setLoading(false);
      if (response.data && response_info.data) {
        navigate('/result', { state: { data: response.data, info: response_info.data } });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const projectName = "My React Project";
  const navItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#" },
    { name: "Services", link: "#" },
    { name: "Contact", link: "#" },
  ];

  const styles = {
    app: {
      minHeight: '100vh',
      flexDirection: 'column',
      justifyContent: 'center',
      // backgroundImage: 'linear-gradient(to left, #6699ff, #66ffcc)',
      backgroundImage: 'url("https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-139.jpg?t=st=1716874848~exp=1716875448~hmac=c8ef0ff5778cbf7f1bf059e85d7bdbf780bbe262d441895344e2226e283bdeb6")', 
      backgroundSize: 'cover',
      animation: 'gradientAnimation 15s ease infinite', // Add animation property
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#282c34',
      padding: '0 2em',
      color: 'white',
      height: '80px',
      backgroundImage: 'linear-gradient(to right, #e9716f, #6699ff )',
    },
    logo: {
      margin: 0,
      fontSize: '1.5em',
    },
    nav: {
      display: 'flex',
    },
    navList: {
      listStyle: 'none',
      display: 'flex',
      margin: 0,
      padding: 0,
    },
    navItem: {
      marginLeft: '1.5em',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1em',
      transition: 'color 0.3s',
    },
    navLinkHover: {
      color: '#61dafb',
    },
    '@keyframes gradientAnimation': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
    mediaQuery: `
      @media (max-width: 768px) {
        .header {
          flex-direction: column;
          height: auto;
        }
        .nav {
          margin-top: 1em;
        }
        .navItem {
          margin: 0.5em 0;
        }
      }
    `,
  };

  return (
    <div className="App" style={styles.app}>
      <header className="header" style={styles.header}>
        <div className="logo" style={styles.logo}>
          <h1>{projectName}</h1>
        </div>
        <SearchBar onFetchData={fetchData}/>
        <nav className="nav" style={styles.nav}>
          <ul className="nav-list" style={styles.navList}>
            {navItems.map((item, index) => (
              <li key={index} className="nav-item" style={styles.navItem}>
                <a
                  href={item.link}
                  className="nav-link"
                  style={styles.navLink}
                  onMouseOver={(e) => e.currentTarget.style.color = styles.navLinkHover.color}
                  onMouseOut={(e) => e.currentTarget.style.color = styles.navLink.color}>
                    {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <EcommercePlatform />
      {loading && <LoadingSpinner/>}
      <HowToUse />
      <style>{styles.mediaQuery}</style>
    </div>
  );
}

export default Home;
