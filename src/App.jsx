import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header/Header';
import CardHeader from './components/Cards/CardHeader';
import ProductCard from './components/Cards/ProductCard';
import Counter from './features/counter/Counter';
import CartPage from './features/Cartpage/CartPage';
import WishlistPage from './features/wishlist/WishlistPage';
import { sampleProducts } from './data/sampleProducts';

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import './App.css';

// --- New data for the slider ---
const sliderImages = [
  {
    id: 1,
    url: 'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg',
    alt: 'Western Wear Offer',
  },
  {
    id: 2,
    url: 'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg',
    alt: 'USPA Offer',
  },
  {
    id: 3,
    url: 'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg',
    alt: 'Activewear Offer',
  },
  {
    id: 4,
    url: 'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg',
    alt: 'Main Banner',
  },
];

const promoCards = [
  { id: 'ketch', title: 'KETCH', subtitle: 'Min. 70% Off', image: 'https://rukminim2.flixcart.com/image/612/612/l13whow0/shirt/n/q/b/s-khsh000667-ketch-original-imagcqsyjbtx2nxw.jpeg?q=70' },
  { id: 'sassafras', title: 'SASSAFRAS', subtitle: 'Min. 70% Off', image: 'https://tse2.mm.bing.net/th/id/OIP.xTWluhYBJJRofATqhCFhCAHaI4?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'berrylush', title: 'Berrylush', subtitle: 'Min. 65% Off', image: 'https://tse4.mm.bing.net/th/id/OIP.xj8XYTAsuHWiBUX6jtiUXQHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'dennison', title: 'Dennison', subtitle: 'Min. 65% Off', image: 'https://tse2.mm.bing.net/th/id/OIP.qJi-8an3ylyH3rUIkUIGfAHaHa?w=563&h=563&rs=1&pid=ImgDetMain&o=7&rm=3' },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const navHandler = (e) => {
      if (e.detail?.page) setCurrentPage(e.detail.page);
    };
    const searchHandler = (e) => {
      setQuery((e.detail?.q || '').toString());
    };
    window.addEventListener('navigate', navHandler);
    window.addEventListener('search', searchHandler);
    return () => {
      window.removeEventListener('navigate', navHandler);
      window.removeEventListener('search', searchHandler);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleProducts;
    return sampleProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q)
    );
  }, [query]);

  const renderPage = () => {
    switch (currentPage) {
      case 'counter':
        return <Counter />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'home':
      default:
        return (
          <>
            {/* --- Hero Section Swiper --- */}
            <section className="hero-section">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                className="hero-swiper"
              >
                {sliderImages.map((image) => (
                  <SwiperSlide key={image.id}>
                    <img src={image.url} alt={image.alt} className="hero-image" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>

            <section className="categories-section">
              <h2>Rising Stars</h2>
              <div className="categories-grid">
                {promoCards.map((card) => (
                  <div key={card.id} className="category-card" style={{ padding: 0 }}>
                    <img src={card.image} alt={card.title} style={{ width: '100%', height: 220, objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                    <div style={{ background: '#fff', border: '1px solid #eaeaec', borderTop: 'none', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, padding: '12px 8px', textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, color: '#282c3f' }}>{card.title}</div>
                      <div style={{ color: '#282c3f', fontWeight: 700, marginTop: 4 }}>{card.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="featured-products">
              <CardHeader
                title={query ? `Results for "${query}"` : "Featured Products"}
                subtitle={query ? undefined : "Discover our handpicked collection of trending items"}
              />
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', color: '#535766' }}>No products found.</div>
                )}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {renderPage()}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Myntra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;