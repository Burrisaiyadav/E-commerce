import React, { useState, useEffect } from 'react';
import './CartPage.css';

// --- Initial Data (In a real app, this would come from props or a store) ---
const initialItem = {
  id: 1,
  brand: 'FUBAR',
  title: 'Men Slim Fit Opaque Casual Shirt',
  image: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/23075844/2023/5/9/615b14e3-34b3-4416-b8f6-173f4a3900a01683612177309-FUBAR-Men-White--Black-Printed-Opaque-Casual-Shirt-36916836-1.jpg',
  size: '38',
  price: 1999,
  discountPrice: 358,
};

const initialAddress = {
  name: 'Sai Yadav',
  pincode: '523116',
  fullAddress: 'Current Office Back Side, Markapur, Markapur Bazar, Markapur',
};

const CheckoutPage = () => {
  // --- State Management ---
  const [items, setItems] = useState([initialItem]);
  const [wishlist, setWishlist] = useState([]);
  const [address, setAddress] = useState(initialAddress);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(initialAddress);
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discount }
  const [couponError, setCouponError] = useState('');
  const [donationAmount, setDonationAmount] = useState(0);

  // --- Price Calculation ---
  const totalMRP = items.reduce((acc, item) => acc + item.price, 0);
  const totalDiscount = items.reduce((acc, item) => acc + (item.price - item.discountPrice), 0);
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const subTotal = totalMRP - totalDiscount;
  const totalAmount = subTotal - couponDiscount + donationAmount;


  // --- Event Handlers ---
  const handleRemoveItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };
  
  const handleMoveToWishlist = (item) => {
    setWishlist([...wishlist, item]);
    handleRemoveItem(item.id);
    console.log("Moved to Wishlist:", [...wishlist, item]); // For demo purposes
  };

  const handleAddressEdit = () => {
    setTempAddress(address); // Store current address in case of cancellation
    setIsEditingAddress(true);
  };

  const handleAddressSave = () => {
    setAddress(tempAddress);
    setIsEditingAddress(false);
  };
  
  const handleAddressCancel = () => {
    setIsEditingAddress(false); // Just close the form without saving
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    setCouponError('');
    setAppliedCoupon(null);

    if (code === 'SALE100') {
      setAppliedCoupon({ code, discount: 100 });
      setCouponCode('');
    } else if (code === 'FLAT50') {
        if (subTotal < 350) {
            setCouponError('This coupon is valid on orders above ₹350');
            return;
        }
      setAppliedCoupon({ code, discount: 50 });
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };
  
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  }

  const handleDonation = (amount) => {
    // If the same amount is clicked again, deselect it. Otherwise, select the new amount.
    setDonationAmount(prev => (prev === amount ? 0 : amount));
  }

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert("Your bag is empty. Please add items to place an order.");
      return;
    }
    const orderSummary = `
      Order Placed Successfully!
      --------------------------
      Deliver to: ${address.name}
      Total Amount Paid: ₹${totalAmount.toLocaleString()}
      (Including ₹${donationAmount} donation)
      
      Thank you for your order!
    `;
    alert(orderSummary);
  };

  return (
    <div className="checkout-page-container">
      <header className="page-header">
        {/* ... header JSX remains the same ... */}
        <div className="stepper">
          <span>BAG</span><div className="stepper-divider"></div><span className="active">ADDRESS</span><div className="stepper-divider"></div><span>PAYMENT</span>
        </div>
        <div className="secure-badge">
          <img src="https://constant.myntassets.com/checkout/assets/images/sprite-secure.png" alt="Secure" />
          <span>100% SECURE</span>
        </div>
      </header>

      <main className="page-main">
        {/* LEFT COLUMN */}
        <div className="left-section">
          <div className="card">
            {isEditingAddress ? (
              <div className="address-edit-form">
                <h4>Edit Delivery Address</h4>
                <input type="text" value={tempAddress.name} placeholder="Name" onChange={(e) => setTempAddress({...tempAddress, name: e.target.value})} />
                <input type="text" value={tempAddress.pincode} placeholder="Pincode" onChange={(e) => setTempAddress({...tempAddress, pincode: e.target.value})} />
                <textarea rows="3" value={tempAddress.fullAddress} placeholder="Full Address" onChange={(e) => setTempAddress({...tempAddress, fullAddress: e.target.value})}></textarea>
                <div>
                  <button className="primary-button" onClick={handleAddressSave}>SAVE</button>
                  <button className="outline-button" onClick={handleAddressCancel}>CANCEL</button>
                </div>
              </div>
            ) : (
              <div className="address-box">
                <div className="address-info">
                  <span>Deliver to: </span>
                  <strong>{address.name}, {address.pincode}</strong>
                  <p>{address.fullAddress}</p>
                </div>
                <button className="outline-button" onClick={handleAddressEdit}>CHANGE ADDRESS</button>
              </div>
            )}
          </div>

          <div className="card">
            <div className="offers-box">
              <span className="icon">🎁</span>
              <strong>Available Offers</strong>
              <ul>
                <li>10% Instant Discount on HDFC Bank Credit Card, Credit Card EMI & Debit Card EMI on a min spend of ₹3,500. TCA</li>
                {showMoreOffers && (
                  <>
                    <li>5% Unlimited Cashback on Flipkart Axis Bank Credit Card. TCA</li>
                    <li>Get up to ₹500 Cashback on CRED Pay UPI. TCA</li>
                  </>
                )}
              </ul>
              <span className="show-more-link" onClick={() => setShowMoreOffers(!showMoreOffers)}>
                {showMoreOffers ? 'Show Less ▲' : 'Show More ▼'}
              </span>
            </div>
          </div>
          
          {items.length > 0 ? (
            <>
              <div className="card items-summary-header">
                <strong>{items.length}/{items.length} ITEMS SELECTED</strong>
                <div>
                  <button className="action-link" onClick={() => setItems([])}>REMOVE ALL</button>
                  <button className="action-link" onClick={() => {setWishlist([...wishlist, ...items]); setItems([])}}>MOVE ALL TO WISHLIST</button>
                </div>
              </div>
              {items.map(item => (
                <div className="card item-card-container" key={item.id}>
                  <button className="item-remove-button" onClick={() => handleRemoveItem(item.id)}>×</button>
                  <div className="item-card">
                    <div className="item-image-container">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="item-details-container">
                      <p className="item-brand">{item.brand}</p>
                      <p className="item-title">{item.title}</p>
                      <div className="item-size-selector"><span>Size: {item.size}</span></div>
                      <div className="item-price-details">
                        <strong className="final-price">₹{item.discountPrice}</strong>
                        <span className="original-price">₹{item.price}</span>
                        <span className="discount-percentage">({Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF)</span>
                      </div>
                      <p className="return-policy"><strong>7 days</strong> return available</p>
                      <button className="action-link move-to-wishlist" onClick={() => handleMoveToWishlist(item)}>Move to Wishlist</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className='card'><strong>Your shopping bag is empty.</strong></div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-section">
          <div className="card">
            <h4 className="card-heading">COUPONS</h4>
            {appliedCoupon ? (
              <div className="coupon-applied-box">
                <strong>✓ {appliedCoupon.code} Applied</strong>
                <button className='action-link' onClick={handleRemoveCoupon}>REMOVE</button>
              </div>
            ) : (
              <>
                <div className="coupon-apply-box">
                  <input type="text" placeholder="Enter Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
                  <button className="outline-button" onClick={handleApplyCoupon}>APPLY</button>
                </div>
                {couponError && <p className="coupon-error">{couponError}</p>}
              </>
            )}
          </div>

          <div className="card">
            <h4 className="card-heading-bold">SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA</h4>
            <div className="donation-box">
               <input type="checkbox" id="donation-check" checked={donationAmount > 0} readOnly/>
               <label htmlFor="donation-check">Donate and make a difference</label>
            </div>
            <div className="donation-buttons">
               <button className={donationAmount === 10 ? 'selected' : ''} onClick={() => handleDonation(10)}>₹10</button>
               <button className={donationAmount === 50 ? 'selected' : ''} onClick={() => handleDonation(50)}>₹50</button>
               <button className={donationAmount === 100 ? 'selected' : ''} onClick={() => handleDonation(100)}>₹100</button>
            </div>
          </div>

          <div className="card price-details-card">
            <h4 className="card-heading">PRICE DETAILS ({items.length} Item)</h4>
            <div className="price-row"><span>Total MRP</span><span><s>₹{totalMRP.toLocaleString()}</s></span></div>
            <div className="price-row"><span className="with-link">Discount on MRP</span><span className="green-text">- ₹{totalDiscount.toLocaleString()}</span></div>
            {appliedCoupon && <div className="price-row"><span className="with-link">Coupon Discount</span><span className="green-text">- ₹{couponDiscount.toLocaleString()}</span></div>}
            <div className="price-row"><span className="with-link">Platform & Event Fee</span><span className="green-text">FREE</span></div>
            {donationAmount > 0 && <div className="price-row"><span>Donation</span><span>+ ₹{donationAmount.toLocaleString()}</span></div>}
            <hr />
            <div className="price-row total-amount-row"><strong>Total Amount</strong><strong>₹{totalAmount.toLocaleString()}</strong></div>
            <button className="primary-button" onClick={handlePlaceOrder}>PLACE ORDER</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;