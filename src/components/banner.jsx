import React from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';

const AppStyles = () => (
  <style>{`
    /* Global Styles */
    body {
      margin: 0;
      font-family: "Assistant", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #f5f5f6;
    }

    /* General Header Styling */
    .header {
        width: 100%;
        height: 80px;
        background-color: #ffffff;
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    .header-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* Logo */
    .logo {
        height: 40px;
    }
    .logo img {
        height: 100%;
        width: auto;
    }

    /* Desktop Navigation */
    .nav-container {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        position: relative;
    }
    .nav {
        display: none; /* Hidden on mobile by default */
        height: 100%;
    }
    
    .nav-list {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 30px;
        height: 100%;
    }

    .nav-list li {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .nav-list li a {
        text-decoration: none;
        color: #282c3f;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: .3px;
        text-transform: uppercase;
        padding: 28px 0;
        border-bottom: 2px solid transparent;
        transition: border-bottom 0.2s ease-in-out;
    }

    .nav-list li:hover a {
        border-bottom: 2px solid #ee5f73;
    }

    .new-label {
        color: #ff3f6c;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        margin-left: 4px;
        vertical-align: super;
    }

    /* Dropdown Menu */
    .dropdown-menu {
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        background-color: #fff;
        box-shadow: 0 4px 12px 0 rgba(0,0,0,.05);
        padding: 24px 0;
        display: none;
        border-top: 1px solid #f5f5f6;
    }
    
    .dropdown-menu-content {
        max-width: 1080px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-start;
    }


    .dropdown-menu.visible {
        display: block;
    }

    .dropdown-column {
        padding: 0 20px;
        min-width: 200px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .dropdown-column:nth-of-type(even) {
        background-color: rgba(245,245,246,.4);
    }
    
    .dropdown-section h4 {
        margin: 0 0 12px 0;
        color: #ee5f73;
        font-size: 14px;
        font-weight: 700;
    }

    .dropdown-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .dropdown-section li a {
        text-decoration: none;
        color: #282c3f;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
    }

    .dropdown-section li a:hover {
        color: #ee5f73;
        font-weight: 700;
    }

    /* Studio Dropdown */
    .studio-dropdown-content {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
    }
    .studio-header img {
        height: 35px;
        margin-bottom: 10px;
    }
    .studio-header p {
        margin: 0 0 20px 0;
        font-size: 16px;
        color: #535766;
    }
    .studio-banner img {
        width: 100%;
        border-radius: 4px;
        margin-bottom: 20px;
    }
    .studio-button {
        display: inline-block;
        padding: 12px 24px;
        border: 1px solid #d4d5d9;
        border-radius: 4px;
        text-decoration: none;
        color: #282c3f;
        font-weight: 700;
        font-size: 14px;
        transition: all 0.2s ease;
    }
    .studio-button:hover {
        background-color: #f5f5f6;
    }


    /* Search Container */
    .search-container {
        display: none; /* Hidden on mobile by default */
        align-items: center;
        background-color: #f5f5f6;
        border-radius: 4px;
        height: 40px;
        min-width: 300px;
    }

    .search-button {
        background: transparent;
        border: none;
        padding: 0 12px;
        cursor: pointer;
        color: #696e79;
    }

    .search-input {
        border: none;
        background: transparent;
        outline: none;
        flex: 1;
        font-size: 14px;
        color: #696e79;
    }

    .search-input::placeholder {
        color: #94969f;
    }

    /* User Actions */
    .user-actions {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .action-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 12px;
        font-weight: 700;
        color: #282c3f;
        gap: 2px;
    }

    .cart-icon-container {
        position: relative;
    }

    .cart-badge {
        position: absolute;
        top: -8px;
        right: -12px;
        background-color: #ff3f6c;
        color: #fff;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
        font-weight: 700;
        border: 1px solid #fff;
    }

    /* Mobile Menu Button */
    .mobile-menu-button {
        display: block;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        color: #282c3f;
    }

    /* Mobile Menu */
    .mobile-menu {
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
        padding: 10px 0;
    }

    .mobile-nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .mobile-nav ul li a {
        display: block;
        padding: 15px 20px;
        text-decoration: none;
        color: #282c3f;
        font-size: 16px;
        font-weight: 700;
    }

    /* --- Responsive Design --- */

    @media (min-width: 768px) {
        .search-container {
            display: flex;
        }
        .mobile-menu-button {
            display: none;
        }
    }

    @media (min-width: 1024px) {
        .nav {
            display: block;
        }
        .user-actions {
            gap: 30px;
        }
    }

    /* --- HomePage Styles --- */
    .main-content {
      padding-top: 80px; /* To offset the fixed header */
      max-width: 1280px;
      margin: 0 auto;
      padding-left: 20px;
      padding-right: 20px;
    }

    /* Image Slider */
    .slider-container {
      position: relative;
      width: 100%;
      margin: 20px 0;
      overflow: hidden;
    }

    .slider-wrapper {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }

    .slide {
      min-width: 100%;
      box-sizing: border-box;
    }

    .slide img {
      width: 100%;
      display: block;
    }
    
    .slider-dots {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #d4d5d9;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .dot.active {
      background-color: #535766;
    }

    /* Rising Stars Section */
    .rising-stars-section {
      padding: 40px 0;
    }

    .section-title {
      font-size: 28px;
      font-weight: 700;
      color: #282c3f;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 30px;
      text-align: center;
    }

    .stars-container {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }

    .star-item img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .star-item img:hover {
      transform: scale(1.05);
    }
  `}</style>
);


function App() {
  return (
    <>
      <AppStyles />
      <Header />
      <HomePage />
    </>
  );
}

export default App;

