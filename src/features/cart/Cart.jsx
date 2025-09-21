import React from 'react';
import './CheckoutPage.css';

// You can replace this with your actual product image URL
const productImage = 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/23075844/2023/5/9/615b14e3-34b3-4416-b8f6-173f4a3900a01683612177309-FUBAR-Men-White--Black-Printed-Opaque-Casual-Shirt-36916836-1.jpg';

const CheckoutPage = () => {
  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <div className="stepper">
          <span>BAG</span>
          <span className="divider"></span>
          <span className="active">ADDRESS</span>
          <span className="divider"></span>
          <span>PAYMENT</span>
        </div>
        <div className="secure-badge">
          <span className="tick-icon">✓</span> 100% SECURE
        </div>
      </header>

      <main className="checkout-main">
        <div className="left-column">
          <div className="card address-card">
            <div className="address-details">
              <strong>Deliver to: Sai Yadav, 523116</strong>
              <p>Current Office Back Side, Markapur, Markapur Bazar, Markapur</p>
            </div>
            <button className="change-address-btn">CHANGE ADDRESS</button>
          </div>

          <div className="card offers-card">
            <p className="card-title"><strong>Available Offers</strong></p>
            <ul>
              <li>10% Instant Discount on HDFC Bank Credit Card, Credit Card EMI & Debit Card EMI on a min spend of ₹3,500. TCA</li>
            </ul>
            <span className="show-more">Show More ▼</span>
          </div>

          <div className="out-of-stock-alert">
            <span>Item(s) out of stock.</span>
            <button>VIEW</button>
          </div>

          <div className="items-header">
            <strong>1/1 ITEMS SELECTED</strong>
            <div>
              <button className="header-btn">REMOVE</button>
              <button className="header-btn">MOVE TO WISHLIST</button>
            </div>
          </div>

          <div className="card item-card">
            <button className="remove-item-btn">×</button>
            <div className="item-content">
              <img src={productImage} alt="Casual Shirt" className="item-image" />
              <div className="item-details">
                <p className="item-brand">FUBAR</p>
                <p>Men Slim Fit Opaque Casual Shirt</p>
                <div className="item-size">
                  <span>Size: 38</span>
                  <span className="size-unavailable">Size not available</span>
                </div>
                <div className="item-price">
                  <strong className="current-price">₹358</strong>
                  <span className="original-price">₹1,999</span>
                  <span className="discount-off">(₹1,641 OFF)</span>
                </div>
                <p className="return-info"><strong>7 days</strong> return available</p>
              </div>
            </div>
          </div>

          <div className="card add-wishlist-card">
            <span>Add More From Wishlist</span>
            <span>&gt;</span>
          </div>
        </div>

        <div className="right-column">
          <div className="card coupons-card">
            <p className="card-title"><strong>COUPONS</strong></p>
            <div className="apply-coupon-section">
              <span>Apply Coupons</span>
              <button>APPLY</button>
            </div>
          </div>

          <div className="card donation-card">
            <p className="card-title"><strong>SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA</strong></p>
            <div className="donation-option">
              <input type="checkbox" id="donate-checkbox" />
              <label htmlFor="donate-checkbox"><strong>Donate and make a difference</strong></label>
            </div>
            <div className="donation-amounts">
              <button>₹10</button>
              <button>₹50</button>
              <button>₹100</button>
            </div>
            <span className="know-more">Know More</span>
          </div>

          <div className="price-summary-card">
            <p className="card-title">PRICE DETAILS (1 Item)</p>
            <div className="price-row">
              <span>Total MRP</span>
              <span className="strikethrough">₹1,999</span>
            </div>
            <div className="price-row">
              <span>Discount on MRP</span>
              <span className="discount-amount">- ₹1,641</span>
            </div>
            <div className="price-row">
              <span>Coupon Discount</span>
              <button className="apply-coupon-link">Apply Coupon</button>
            </div>
            <div className="price-row">
              <span>Platform & Event Fee</span>
              <span className="free-fee">FREE</span>
            </div>
            <hr />
            <div className="price-row total-row">
              <strong>Total Amount</strong>
              <strong>₹358</strong>
            </div>
            <button className="place-order-btn">PLACE ORDER</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;