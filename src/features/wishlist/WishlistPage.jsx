import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from './wishlistSlice'

const WishlistPage = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.wishlist.items)

  const removeItem = (id) => dispatch(removeFromWishlist(id))

  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px' }}>
        <h2 style={{ margin: '8px 0 16px 0', color: '#282c3f' }}>Wishlist ({items.length})</h2>
        {items.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #eaeaec', borderRadius: 4, padding: 24 }}>
            Your wishlist is empty.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {items.map((item) => (
              <div key={item.id} style={{ background: '#fff', border: '1px solid #eaeaec', borderRadius: 4, padding: 12 }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 4 }} />
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontWeight: 700, color: '#282c3f' }}>{item.brand}</div>
                  <div style={{ color: '#535766', fontSize: 14 }}>{item.name}</div>
                  <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700 }}>₹{item.price}</span>
                    {item.originalPrice && (
                      <span style={{ color: '#94969f', textDecoration: 'line-through', fontSize: 12 }}>₹{item.originalPrice}</span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  style={{ marginTop: 10, width: '100%', height: 36, borderRadius: 4, border: '1px solid #d4d5d9', background: '#fff', fontWeight: 700, cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage






