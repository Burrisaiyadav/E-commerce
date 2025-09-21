import React, { useState } from "react";
import { useSelector } from "react-redux";

// All the styles are now included inside this component.
const HeaderStyles = () => (
  <style>{`
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
        font-family: "Assistant", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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
        color: #1f1a1aff;
        font-weight: 700;
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
        position: relative;
    }

    .cart-icon-container,
    .wishlist-icon-container {
        position: relative;
    }

    .cart-badge,
    .wishlist-badge {
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

    /* Tablet and Desktop */
    @media (min-width: 768px) {
        .search-container {
            display: flex;
        }
        .mobile-menu-button {
            display: none;
        }
    }

    /* Desktop */
    @media (min-width: 1024px) {
        .nav {
            display: block;
        }
        .user-actions {
            gap: 30px;
        }
    }
  `}</style>
);

const navItems = [
  {
    id: "men",
    label: "Men",
    dropdown: [
      [
        // Column 1
        {
          title: "Topwear",
          items: [
            "T-Shirts",
            "Casual Shirts",
            "Formal Shirts",
            "Sweatshirts",
            "Sweaters",
            "Jackets",
            "Blazers & Coats",
            "Suits",
            "Rain Jackets",
          ],
        },
        {
          title: "Indian & Festive Wear",
          items: [
            "Kurtas & Kurta Sets",
            "Sherwanis",
            "Nehru Jackets",
            "Dhotis",
          ],
        },
      ],
      [
        // Column 2
        {
          title: "Bottomwear",
          items: [
            "Jeans",
            "Casual Trousers",
            "Formal Trousers",
            "Shorts",
            "Track Pants & Joggers",
          ],
        },
        {
          title: "Innerwear & Sleepwear",
          items: [
            "Briefs & Trunks",
            "Boxers",
            "Vests",
            "Sleepwear & Loungewear",
            "Thermals",
          ],
        },
        { title: "Plus Size", items: [""] },
      ],
      [
        // Column 3
        {
          title: "Footwear",
          items: [
            "Casual Shoes",
            "Sports Shoes",
            "Formal Shoes",
            "Sneakers",
            "Sandals & Floaters",
            "Flip Flops",
            "Socks",
          ],
        },
        { title: "Personal Care & Grooming", items: [] },
        { title: "Sunglasses & Frames", items: [] },
        { title: "Watches", items: [] },
      ],
      [
        // Column 4
        {
          title: "Sports & Active Wear",
          items: [
            "Sports Shoes",
            "Sports Sandals",
            "Active T-Shirts",
            "Track Pants & Shorts",
            "Tracksuits",
            "Jackets & Sweatshirts",
            "Sports Accessories",
            "Swimwear",
          ],
        },
        {
          title: "Gadgets",
          items: [
            "Smart Wearables",
            "Fitness Gadgets",
            "Headphones",
            "Speakers",
          ],
        },
      ],
      [
        // Column 5
        {
          title: "Fashion Accessories",
          items: [
            "Wallets",
            "Belts",
            "Perfumes & Body Mists",
            "Trimmers",
            "Deodorants",
            "Ties, Cufflinks & Pocket Squares",
            "Accessory Gift Sets",
            "Caps & Hats",
            "Mufflers, Scarves & Gloves",
            "Phone Cases",
            "Rings & Wristwear",
            "Helmets",
          ],
        },
        { title: "Bags & Backpacks", items: [] },
        { title: "Luggages & Trolleys", items: [] },
      ],
    ],
  },
  {
    id: "women",
    label: "Women",
    dropdown: [
      // Simplified for brevity, can be expanded like 'men'
      [
        {
          title: "Indian & Fusion Wear",
          items: [
            "Kurtis, Tunics & Tops",
            "Sarees",
            "Ethnic Wear",
            "Leggings, Salwars & Churidars",
            "Skirts & Palazzos",
            "Dress Materials",
            "Lehenga Cholis",
            "Dupattas & Shawls",
            "Jackets",
          ],
        },
      { title: "Belts, Scarves & More", items: [] },
      { title: "Watches & Wearables", items: [] }],
      [
        {
          title: "Western Wear",
          items: [
            "Dresses",
            "Tops",
            "Tshirts",
            "Jeans",
            "Trousers & Capris",
            "Shorts & Skirts",
            "Co-ords",
            "Playsuits",
            "Jumpsuits",
            "Shrugs",
            "Sweaters & Sweatshirts",
            "Jackets & Coats",
            "Blazers & Waistcoats",
          ],
        },
     
      { title: "Plus size", items: [] }],
    ],
  },
  { id: "kids", label: "Kids" },
  { id: "home", label: "Home & Living" },
  { id: "beauty", label: "Beauty" },
  { id: "studio", label: "Studio", isNew: true },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [search, setSearch] = useState('')
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistCount = useSelector((state) => state.wishlist.totalQuantity);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = (itemId) => {
    const item = navItems.find((navItem) => navItem.id === itemId);
    if (item && item.dropdown) {
      setOpenDropdown(itemId);
    }
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const currentDropdownData = navItems.find(
    (item) => item.id === openDropdown
  )?.dropdown;

  const goToCart = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'cart' } }));
  };
  const goToWishlist = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'wishlist' } }));
  };

  const submitSearch = (q) => {
    window.dispatchEvent(new CustomEvent('search', { detail: { q } }))
  }

  const onSearchChange = (e) => {
    const q = e.target.value
    setSearch(q)
    submitSearch(q)
  }

  const onSearchKeyDown = (e) => {
    if (e.key === 'Enter') submitSearch(search)
  }

  return (
    <>
      <HeaderStyles />
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo">
            <img
              src="https://cdn.freelogovectors.net/wp-content/uploads/2020/02/myntra-logo.png"
              alt="Myntra Logo"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="nav-container" onMouseLeave={handleMouseLeave}>
            <nav className="nav">
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li
                    key={item.id}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                  >
                    <a href={`#${item.id}`}>
                      {item.label}
                      {item.isNew && <sup className="new-label">New</sup>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={`dropdown-menu ${openDropdown ? "visible" : ""}`}>
              <div className="dropdown-menu-content">
                {currentDropdownData &&
                  currentDropdownData.map((column, index) => (
                    <div key={index} className="dropdown-column">
                      {column.map((section) =>
                        section.items.length > 0 ? (
                          <div key={section.title} className="dropdown-section">
                            <h4>{section.title}</h4>
                            <ul>
                              {section.items.map(
                                (item) =>
                                  item && (
                                    <li key={item}>
                                      <a href="#">{item}</a>
                                    </li>
                                  )
                              )}
                            </ul>
                          </div>
                        ) : (
                          <div key={section.title} className="dropdown-section">
                            <h4>
                              <a href="#">{section.title}</a>
                            </h4>
                          </div>
                        )
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <button className="search-button" onClick={() => submitSearch(search)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="search-input"
              value={search}
              onChange={onSearchChange}
              onKeyDown={onSearchKeyDown}
            />
          </div>

          {/* User Actions */}
          <div className="user-actions">
            <button className="action-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Profile</span>
            </button>

            <button className="action-button">
              <div className="wishlist-icon-container" onClick={goToWishlist}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                {wishlistCount > 0 && (
                  <span className="wishlist-badge">{wishlistCount}</span>
                )}
              </div>
              <span>Wishlist</span>
            </button>

            <button className="action-button cart-button" onClick={goToCart}>
              <div className="cart-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {totalQuantity > 0 && (
                  <span className="cart-badge">{totalQuantity}</span>
                )}
              </div>
              <span>Bag</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-button" onClick={toggleMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              <ul>
                <li>
                  <a href="#men" onClick={toggleMenu}>
                    Men
                  </a>
                </li>
                <li>
                  <a href="#women" onClick={toggleMenu}>
                    Women
                  </a>
                </li>
                <li>
                  <a href="#kids" onClick={toggleMenu}>
                    Kids
                  </a>
                </li>
                <li>
                  <a href="#home" onClick={toggleMenu}>
                    Home & Living
                  </a>
                </li>
                <li>
                  <a href="#beauty" onClick={toggleMenu}>
                    Beauty
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
