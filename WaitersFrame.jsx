import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { LuxuryPalette, hotelCulinaryMenu } from './sharedState';

export default function WaitersFrame() {
  const [cart, setCart] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const calculateTotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleProceedPayment = () => {
    if (!mobileNumber || cart.length === 0) {
      alert("Please add items to cart and insert a valid payment reference mobile number.");
      return;
    }

    const orderId = "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const confirmedOrder = {
      orderId: orderId,
      location: "Suite " + (Math.floor(Math.random() * 150) + 100),
      totalAmount: calculateTotal().toFixed(2),
      mobileUsed: mobileNumber,
      items: [...cart],
      status: "PENDING EXECUTION"
    };

    setGeneratedReceipt(confirmedOrder);
    setCart([]);
    setMobileNumber('');
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Renders Sidebar strictly configured for Waiters permissions */}
      <Sidebar userRole="Waiters" currentActiveTab={4} onTabChange={() => {}} />

      <div style={{ flexGrow: 1, padding: '32px', boxSizing: 'border-box' }}>
        <h2 style={{ color: LuxuryPalette.textDark, marginBottom: '24px' }}>Fine Culinary Selection Menu</h2>

        {generatedReceipt && (
          <div style={{
            backgroundColor: '#FFFFFF',
            border: `2px solid ${LuxuryPalette.lightGold}`,
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ color: LuxuryPalette.lightGreen, margin: '0 0 10px 0' }}>🎉 Order Successfully Sent to Kitchen!</h3>
            <p style={{ margin: '4px 0', fontSize: '15px' }}><strong>Order Reference ID:</strong> <span style={{ color: LuxuryPalette.cardRed, fontWeight: '700' }}>{generatedReceipt.orderId}</span></p>
            <p style={{ margin: '4px 0' }}><strong>Target Room Delivery Location:</strong> {generatedReceipt.location}</p>
            <p style={{ margin: '4px 0' }}><strong>Total Yield Confirmed:</strong> ${generatedReceipt.totalAmount}</p>
            <p style={{ margin: '4px 0' }}><strong>mPayment Reference Device Number:</strong> {generatedReceipt.mobileUsed}</p>
            <button onClick={() => setGeneratedReceipt(null)} style={{ marginTop: '12px', padding: '6px 12px', backgroundColor: LuxuryPalette.silver, border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Dismiss Receipt</button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Menu Items Showcase Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {hotelCulinaryMenu.map(product => (
              <div key={product.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: `1px solid ${LuxuryPalette.silver}`, overflow: 'hidden' }}>
                <div style={{ height: '160px', backgroundColor: '#F3F4F6', backgroundImage: `url('/images/${product.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '16px' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: LuxuryPalette.textDark, fontSize: '16px' }}>{product.name}</h4>
                  <p style={{ margin: '0 0 12px 0', fontWeight: '700', color: LuxuryPalette.lightGold }}>${product.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(product)} style={{ width: '100%', backgroundColor: LuxuryPalette.lightGreen, color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
                    + ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* POS Active Cart Panel */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: `1px solid ${LuxuryPalette.silver}`, height: 'fit-content' }}>
            <h3 style={{ margin: '0 0 16px 0', borderBottom: `2px solid ${LuxuryPalette.silver}`, paddingBottom: '8px' }}>Selected Basket</h3>
            
            {cart.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '14px', textAlign: 'center', padding: '32px 0' }}>Your culinary basket is currently empty.</p>
            ) : (
              <div>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                    <span>{item.name} (x{item.qty})</span>
                    <strong>${(item.price * item.qty).toFixed(2)}</strong>
                  </div>
                ))}
                
                <div style={{ borderTop: `1px solid ${LuxuryPalette.silver}`, paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                  <span>Total Amount Due:</span>
                  <span style={{ color: LuxuryPalette.lightGreen }}>${calculateTotal().toFixed(2)}</span>
                </div>

                <div style={{ marginTop: '24px', backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '8px', border: `1px solid ${LuxuryPalette.silver}` }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: LuxuryPalette.textDark }}>
                    MOBILE NUMBER USED TO MAKE PAYMENT:
                  </label>
                  <input 
                    type="text" 
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="e.g., +250 78X XXX XXX" 
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: `1px solid ${LuxuryPalette.silver}`, borderRadius: '6px', outline: 'none' }}
                  />
                </div>

                <button onClick={handleProceedPayment} style={{ width: '100%', marginTop: '16px', backgroundColor: LuxuryPalette.cardRed, color: '#FFFFFF', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
                  PROCEED TO VERIFY & SUBMIT
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}