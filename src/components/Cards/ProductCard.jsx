import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  
  const { 
    id, 
    name, 
    brand, 
    price, 
    originalPrice, 
    discount, 
    image, 
    rating, 
    reviews 
  } = product

  const isInCart = cartItems.some(item => item.id === id)
  const cartItem = cartItems.find(item => item.id === id)
  const quantityInCart = cartItem ? cartItem.quantity : 0

  const inWishlist = wishlistItems.some(item => item.id === id)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  const toggleWishlist = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        {discount && (
          <div className="discount-badge">
            {discount}% OFF
          </div>
        )}
        <button className="wishlist-button" onClick={toggleWishlist} aria-label="wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'}>
            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="product-info">
        <p className="product-brand">{brand}</p>
        <h3 className="product-name">{name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill={i < rating ? "#FFD700" : "#E5E5E5"}
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ))}
          </div>
          <span className="rating-text">({reviews})</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">₹{price}</span>
          {originalPrice && (
            <span className="original-price">₹{originalPrice}</span>
          )}
        </div>

        <div className="cart-section">
          {isInCart ? (
            <div className="cart-status">
              <span className="in-cart-badge">
                ✓ In Cart ({quantityInCart})
              </span>
            </div>
          ) : (
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
