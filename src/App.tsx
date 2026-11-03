import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Utensils, 
  Wine, 
  Calendar, 
  ShoppingBag, 
  Search, 
  Clock, 
  Flame, 
  Check, 
  X, 
  Plus, 
  Minus, 
  Award, 
  Star,
  Compass,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { MENU_ITEMS, MenuItem } from './data/menu';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [reservationConfirmed, setReservationConfirmed] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  // Reservation form state
  const [resName, setResName] = useState('');
  const [resDate, setResDate] = useState('2026-11-05');
  const [resTime, setResTime] = useState('19:30');
  const [resGuests, setResGuests] = useState('2');
  const [resNotes, setResNotes] = useState('');

  // Cart operations
  const addToCart = (dish: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.item.id === dish.id);
      if (existing) {
        return prev.map(ci => 
          ci.item.id === dish.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(ci => {
        if (ci.item.id === id) {
          const newQty = ci.quantity + delta;
          return newQty > 0 ? { ...ci, quantity: newQty } : null;
        }
        return ci;
      }).filter(Boolean) as CartItem[];
    });
  };

  const totalCartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartSubtotal = cart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
  const serviceCharge = cartSubtotal > 0 ? (cartSubtotal * 0.1) : 0;
  const cartTotal = cartSubtotal + serviceCharge;

  // Filtered menu
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.frenchName && item.frenchName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTag = selectedTag === 'all' || item.tags.includes(selectedTag as any);
      return matchCat && matchQuery && matchTag;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  const categories = [
    { id: 'all', label: 'Complete Collection' },
    { id: 'starters', label: 'Hors-d’œuvre & Starters' },
    { id: 'mains', label: 'Plats Principaux' },
    { id: 'desserts', label: 'Entremets & Desserts' },
    { id: 'wines', label: 'Grand Cru & Cellar' },
  ];

  const tags = ['all', 'Signature', 'Chef Special', 'Vegetarian', 'Gluten-Free'];

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationConfirmed(true);
    setTimeout(() => {
      setReservationConfirmed(false);
      setIsReservationOpen(false);
      setResName('');
      setResNotes('');
    }, 2800);
  };

  const handleCheckout = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
      setCart([]);
      setIsCartOpen(false);
    }, 2800);
  };

  return (
    <div className="app-wrapper">
      {/* Navigation */}
      <header className="header-nav">
        <div className="nav-container">
          <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Sparkles size={28} color="#d4af37" />
            <div>
              <div className="brand-name">L'ÉTOILE</div>
              <div className="brand-subtitle">Haute Cuisine • Paris</div>
            </div>
          </div>

          <ul className="nav-links">
            <li><a href="#menu" className="nav-link active">Seasonal Menu</a></li>
            <li><a href="#story" className="nav-link">Our Heritage</a></li>
            <li><a href="#cellar" className="nav-link">Sommelier Cellar</a></li>
            <li><a href="#contact" className="nav-link">Private Dining</a></li>
          </ul>

          <div className="nav-actions">
            <button 
              className="btn-outline" 
              onClick={() => setIsReservationOpen(true)}
              id="reserve-table-nav-btn"
            >
              <Calendar size={16} />
              <span>Reserve Table</span>
            </button>

            <button 
              className="btn-gold" 
              style={{ position: 'relative' }}
              onClick={() => setIsCartOpen(true)}
              id="open-cart-btn"
            >
              <ShoppingBag size={18} />
              <span>Orders</span>
              {totalCartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-6px',
                  background: '#ff3366',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  borderRadius: '999px',
                  padding: '2px 7px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}>
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-overlay"></div>
        <div className="hero-content">
          <span className="section-label">Three Michelin Stars 2026</span>
          <h1 className="hero-title">
            The Symphony of <br /><span className="gold-text">Modern Gastronomy</span>
          </h1>
          <p className="hero-desc">
            Where ancestral French culinary precision meets rare global ingredients. 
            Immerse yourself in a multisensory journey crafted by Chef de Cuisine Antoine Moreau.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#menu" className="btn-gold" style={{ textDecoration: 'none' }}>
              <Utensils size={18} />
              <span>Explore The Menu</span>
            </a>
            <button 
              className="btn-outline" 
              onClick={() => setIsReservationOpen(true)}
              id="hero-reserve-btn"
            >
              <Calendar size={18} />
              <span>Book An Evening</span>
            </button>
          </div>

          <div className="hero-highlights">
            <div className="hero-stat">
              <h3>3 Stars</h3>
              <p>Michelin Guide Honored</p>
            </div>
            <div className="hero-stat">
              <h3>1,400+</h3>
              <p>Rare Grand Cru Labels</p>
            </div>
            <div className="hero-stat">
              <h3>100%</h3>
              <p>Organic Artisanal Sourcing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu & Catalog Section */}
      <section id="menu" style={{ padding: '6rem 1.5rem', maxWidth: '1350px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Culinary Offerings</span>
          <h2 className="font-serif" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '0.4rem' }}>
            Curated Degustation & À La Carte
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0.8rem auto 0', fontSize: '0.95rem' }}>
            Every dish is prepared upon order, adhering to timeless French traditions and elevated by bespoke garnishes.
          </p>
        </div>

        {/* Search & Categories Filter */}
        <div className="filter-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={19} />
            <input 
              type="text" 
              placeholder="Search dishes, ingredients, or pairings (e.g., Wagyu, Caviar, Truffle)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              id="menu-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1.2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                id={`cat-btn-${cat.id}`}
              >
                {cat.id === 'wines' ? <Wine size={16} /> : <Utensils size={16} />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="dietary-tags-wrapper">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', alignSelf: 'center', marginRight: '0.3rem' }}>
              Filter by Tag:
            </span>
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`dietary-tag-btn ${selectedTag === tag ? 'active' : ''}`}
                id={`tag-btn-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tag === 'all' ? 'All Dietary' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Dish Grid */}
        {filteredDishes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-dim)' }}>
            <Compass size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-muted)' }}>
              No culinary masterpieces match your criteria
            </h3>
            <p style={{ marginTop: '0.5rem' }}>Try clearing the search query or selecting a different dietary tag.</p>
            <button 
              className="btn-outline" 
              style={{ marginTop: '1.5rem' }}
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedTag('all'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredDishes.map(dish => (
              <div key={dish.id} className="menu-card" id={`dish-card-${dish.id}`}>
                <div className="menu-image-container">
                  <img src={dish.image} alt={dish.name} className="menu-image" loading="lazy" />
                  <div className="menu-badge-list">
                    {dish.tags.map(t => (
                      <span key={t} className="menu-badge">
                        {t === 'Signature' && '★ '}
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="menu-card-body">
                  <div className="menu-card-header">
                    <div>
                      <h3 className="menu-dish-name">{dish.name}</h3>
                      {dish.frenchName && (
                        <div className="menu-dish-french">{dish.frenchName}</div>
                      )}
                    </div>
                    <div className="menu-dish-price">${dish.price}</div>
                  </div>

                  <p className="menu-dish-desc">{dish.description}</p>

                  {dish.pairing && (
                    <div className="menu-pairing">
                      <Wine size={14} color="#d4af37" />
                      <span><strong>Pairing:</strong> {dish.pairing}</span>
                    </div>
                  )}

                  <div className="menu-dish-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={13} /> {dish.prepTime || '15 min'}
                    </span>
                    {dish.calories && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Flame size={13} /> {dish.calories} kcal
                      </span>
                    )}
                  </div>

                  <button 
                    className="card-cart-btn"
                    onClick={() => addToCart(dish)}
                    id={`add-to-cart-${dish.id}`}
                  >
                    <Plus size={16} />
                    <span>Add To Tasting Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Chef & Heritage Section */}
      <section id="story" style={{ background: '#0e0e13', padding: '6rem 1.5rem', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="section-label">Culinary Philosophy</span>
            <h2 className="font-serif" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '0.5rem', lineHeight: 1.2 }}>
              "Taste is the memory of time, crafted through pure devotion."
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem', lineHeight: '1.8' }}>
              Founded in Paris and now serving discerning connoisseurs, L'Étoile brings an uncompromised standard of craftsmanship. Every morning, our chefs receive direct provisions from wild foraged truffles in Périgord, sustainably sourced Hokkaido seafood, and small-batch biodynamic vineyards.
            </p>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-light)', marginBottom: '0.3rem' }}>
                  <Star fill="#d4af37" size={16} color="#d4af37" />
                  <Star fill="#d4af37" size={16} color="#d4af37" />
                  <Star fill="#d4af37" size={16} color="#d4af37" />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Three Michelin Stars (2024-2026)</div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-light)', marginBottom: '0.3rem' }}>
                  <Award size={18} color="#d4af37" />
                  <span style={{ fontWeight: 'bold' }}>Top 10 Global</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>World’s 50 Best Restaurants</div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lux)',
              border: '1px solid var(--border-active)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80" 
                alt="Chef Antoine Moreau in kitchen"
                style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              right: '-15px',
              background: '#161620',
              border: '1px solid var(--border-active)',
              padding: '1.25rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
            }}>
              <div className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                Antoine Moreau
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Executive Chef & Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <>
          <div className="modal-overlay" onClick={() => setIsCartOpen(false)} style={{ zIndex: 1000 }} />
          <aside className="cart-drawer" id="cart-drawer-container">
            <div className="cart-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShoppingBag color="#d4af37" size={22} />
                <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#fff' }}>Tasting Order</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                id="close-cart-btn"
              >
                <X size={22} />
              </button>
            </div>

            <div className="cart-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
                  <Utensils size={44} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Your tasting cart is empty</p>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>Explore our menu and add exquisite dishes or pairing wines.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {cart.map(ci => (
                    <div 
                      key={ci.item.id} 
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                      }}
                    >
                      <img 
                        src={ci.item.image} 
                        alt={ci.item.name} 
                        style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{ci.item.name}</div>
                        <div style={{ color: 'var(--gold-light)', fontSize: '0.85rem' }}>${ci.item.price} each</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                          <button 
                            onClick={() => updateQuantity(ci.item.id, -1)}
                            style={{
                              background: '#242430',
                              border: 'none',
                              color: '#fff',
                              borderRadius: '4px',
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{ci.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(ci.item.id, 1)}
                            style={{
                              background: '#242430',
                              border: 'none',
                              color: '#fff',
                              borderRadius: '4px',
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>
                        ${ci.item.price * ci.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span>Culinary Service (10%)</span>
                  <span>${serviceCharge.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#fff', fontSize: '1.25rem', fontWeight: 'bold' }}>
                  <span>Total Amount</span>
                  <span className="gold-text">${cartTotal.toFixed(2)}</span>
                </div>

                {orderConfirmed ? (
                  <div style={{
                    background: 'rgba(50, 180, 100, 0.2)',
                    border: '1px solid #32b464',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#66f5a3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem'
                  }}>
                    <Check size={20} />
                    <span>Order Transmitted to Kitchen! Bon Appétit.</span>
                  </div>
                ) : (
                  <button 
                    className="btn-gold" 
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={handleCheckout}
                    id="confirm-checkout-btn"
                  >
                    <span>Confirm Order & Table Service</span>
                  </button>
                )}
              </div>
            )}
          </aside>
        </>
      )}

      {/* Reservation Modal */}
      {isReservationOpen && (
        <div className="modal-overlay" onClick={() => setIsReservationOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} id="reservation-modal">
            <button className="modal-close-btn" onClick={() => setIsReservationOpen(false)}>
              <X size={22} />
            </button>

            <span className="section-label">Private Dining & Reservations</span>
            <h2 className="font-serif" style={{ fontSize: '2.2rem', color: '#fff', marginTop: '0.2rem', marginBottom: '1.5rem' }}>
              Reserve Your Table
            </h2>

            {reservationConfirmed ? (
              <div style={{
                textAlign: 'center',
                padding: '2.5rem 1rem',
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid var(--border-active)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: '#000'
                }}>
                  <Check size={32} />
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#fff' }}>Reservation Confirmed</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Thank you, <strong>{resName || 'Esteemed Guest'}</strong>. A dedicated concierge confirmation has been reserved for {resGuests} guests on {resDate} at {resTime}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} id="reservation-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g., Lord Alexander Wright" 
                    required 
                    value={resName}
                    onChange={e => setResName(e.target.value)}
                    id="res-name-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      required 
                      value={resDate}
                      onChange={e => setResDate(e.target.value)}
                      id="res-date-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <select 
                      className="form-control" 
                      value={resTime} 
                      onChange={e => setResTime(e.target.value)}
                      id="res-time-select"
                    >
                      <option value="18:00">6:00 PM (Sunset Seating)</option>
                      <option value="19:30">7:30 PM (Prime Dinner)</option>
                      <option value="20:45">8:45 PM (Grand Degustation)</option>
                      <option value="21:45">9:45 PM (Late Evening)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Guests</label>
                  <select 
                    className="form-control" 
                    value={resGuests} 
                    onChange={e => setResGuests(e.target.value)}
                    id="res-guests-select"
                  >
                    <option value="1">1 Person (Chef's Counter)</option>
                    <option value="2">2 Persons (Intimate Salon)</option>
                    <option value="4">4 Persons (Grand Table)</option>
                    <option value="6">6 Persons (Private Booth)</option>
                    <option value="8+">8+ Persons (Private Wine Cellar)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Dietary & Occasion Notes</label>
                  <textarea 
                    className="form-control" 
                    rows={3} 
                    placeholder="Anniversary, wine cellar tour request, severe allergy protocols..."
                    value={resNotes}
                    onChange={e => setResNotes(e.target.value)}
                    id="res-notes-input"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-gold" 
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.9rem' }}
                  id="submit-reservation-btn"
                >
                  <Calendar size={18} />
                  <span>Request Guaranteed Reservation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer & Contact */}
      <footer id="contact" style={{ background: '#07070a', padding: '5rem 1.5rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3.5rem' }}>
          <div>
            <div className="brand-name" style={{ fontSize: '2rem' }}>L'ÉTOILE</div>
            <div className="brand-subtitle" style={{ marginBottom: '1.25rem' }}>Gastronomie Étoilée</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              Crafting immortal moments of sensory brilliance through exquisite ingredients, bespoke vintages, and timeless elegance.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Reservations & Inquiries
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} color="#d4af37" />
                <span>18 Avenue Montaigne, 75008 Paris, France</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#d4af37" />
                <span>+33 (0)1 42 68 55 00</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#d4af37" />
                <span>concierge@letoile-gastronomie.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Service Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Lunch (Tue – Sun):</span>
                <span style={{ color: 'var(--gold-light)' }}>12:00 – 14:30</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Dinner (Tue – Sun):</span>
                <span style={{ color: 'var(--gold-light)' }}>18:30 – 23:30</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Monday:</span>
                <span style={{ color: 'var(--text-dim)' }}>Closed for Cellar Curation</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          © 2026 L'Étoile Fine Dining Restaurant. All rights reserved. Designed with luxury culinary aesthetics.
        </div>
      </footer>
    </div>
  );
}
