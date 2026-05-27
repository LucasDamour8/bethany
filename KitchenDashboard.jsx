import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { LuxuryPalette } from './sharedState';

export default function KitchenDashboard() {
  // Setup mocking live entries read out of cloud Firestore
  const [activeOrders, setActiveOrders] = useState([
    { referenceId: "KUTQI4Y2026", location: "Suite 140", amount: "$9.00", status: "PAID & PENDING EXECUTION", phoneUsed: "N/A" },
    { referenceId: "5XXWDJ32026", location: "Suite 285", amount: "$32.00", status: "PENDING EXECUTION", phoneUsed: "+250 788 123 456" },
    { referenceId: "DEAWCRW2026", location: "Suite 174", amount: "$22.00", status: "PENDING EXECUTION", phoneUsed: "+250 789 987 654" }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdateExecution = (refId) => {
    setActiveOrders(prev => prev.map(order => 
      order.referenceId === refId ? { ...order, status: "DISPATCHED TO ROOM" } : order
    ));
    if (selectedOrder && selectedOrder.referenceId === refId) {
      setSelectedOrder(prev => ({ ...prev, status: "DISPATCHED TO ROOM" }));
    }
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Renders Sidebar strictly configured for Kitchen Management permissions */}
      <Sidebar userRole="Chief of Kitchen" currentActiveTab={4} onTabChange={() => {}} />

      <div style={{ flexGrow: 1, padding: '32px', boxSizing: 'border-box' }}>
        <h2 style={{ color: LuxuryPalette.textDark, marginBottom: '6px' }}>4. Restaurant & Orders Dashboard Feed</h2>
        <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#6B7280' }}>Live pipelines reading from cloud tables. Clear un-permitted options filtered automatically.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Main Monitor Display Grid Panel */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: `1px solid ${LuxuryPalette.silver}`, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: `2px solid ${LuxuryPalette.silver}` }}>
                  <th style={{ padding: '16px', fontSize: '13px', color: '#4B5563' }}>Reference ID</th>
                  <th style={{ padding: '16px', fontSize: '13px', color: '#4B5563' }}>Location</th>
                  <th style={{ padding: '16px', fontSize: '13px', color: '#4B5563' }}>Total Amount</th>
                  <th style={{ padding: '16px', fontSize: '13px', color: '#4B5563' }}>Status Flags</th>
                  <th style={{ padding: '16px', fontSize: '13px', color: '#4B5563', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeOrders.map((order) => (
                  <tr key={order.referenceId} style={{ borderBottom: `1px solid ${LuxuryPalette.silver}` }}>
                    <td style={{ padding: '16px', fontFamily: 'monospace', fontWeight: '700' }}>{order.referenceId}</td>
                    <td style={{ padding: '16px', fontWeight: '600' }}>{order.location}</td>
                    <td style={{ padding: '16px' }}>{order.amount}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: order.status.includes('PAID') ? '#E6F6EF' : '#FEF3C7',
                        color: order.status.includes('PAID') ? LuxuryPalette.lightGreen : LuxuryPalette.lightGold
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        style={{ backgroundColor: LuxuryPalette.textDark, color: '#FFFFFF', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                      >
                        Inspect Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Details Inspection Drawer Panel */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: `1px solid ${LuxuryPalette.silver}`, height: 'fit-content' }}>
            <h3 style={{ margin: '0 0 16px 0', borderBottom: `2px solid ${LuxuryPalette.silver}`, paddingBottom: '8px' }}>📋 Details Breakdown</h3>
            
            {selectedOrder ? (
              <div>
                <p style={{ fontSize: '14px', margin: '8px 0' }}><strong>Target Delivery:</strong> {selectedOrder.location}</p>
                <p style={{ fontSize: '14px', margin: '8px 0' }}><strong>Value Amount:</strong> {selectedOrder.amount}</p>
                <p style={{ fontSize: '14px', margin: '8px 0' }}><strong>mPayment Contact Source:</strong> <span style={{ color: LuxuryPalette.lightGreen, fontWeight: '700' }}>{selectedOrder.phoneUsed}</span></p>
                <p style={{ fontSize: '14px', margin: '8px 0' }}><strong>Current Status:</strong> {selectedOrder.status}</p>
                
                {selectedOrder.status !== "DISPATCHED TO ROOM" && (
                  <button 
                    onClick={() => handleUpdateExecution(selectedOrder.referenceId)}
                    style={{ width: '100%', marginTop: '16px', backgroundColor: LuxuryPalette.lightGreen, color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    MARK AS EXECUTED & DISPATCH
                  </button>
                )}
              </div>
            ) : (
              <p style={{ color: '#9CA3AF', fontSize: '14px', textAlign: 'center', padding: '24px 0' }}>Select an incoming order ticket line row to view full parameter breakdowns here.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}