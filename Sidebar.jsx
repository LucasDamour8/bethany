import React from 'react';
import { LuxuryPalette, systemSidebarMenuRegistry } from './sharedState';

export default function Sidebar({ userRole, currentActiveTab, onTabChange }) {
  // Filters out non-permitted modules entirely before rendering
  const allowedMenuItems = systemSidebarMenuRegistry.filter(item => 
    item.allowedRoles.includes(userRole)
  );

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      borderRight: `2px solid ${LuxuryPalette.silver}`,
      padding: '24px 16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: LuxuryPalette.textDark, fontWeight: '800', letterSpacing: '0.5px' }}>
          BETHANY MAIN FRAME
        </h2>
        <span style={{ 
          fontSize: '11px', 
          fontWeight: '700', 
          color: LuxuryPalette.lightGreen, 
          backgroundColor: '#E6F6EF',
          padding: '2px 8px', 
          borderRadius: '4px',
          display: 'inline-block',
          marginTop: '6px'
        }}>
          ACTIVE DUTY: {userRole ? userRole.toUpperCase() : 'NONE'}
        </span>
      </div>

      <nav style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {allowedMenuItems.map((menu) => {
          const isActive = currentActiveTab === menu.id;
          return (
            <button
              key={menu.id}
              onClick={() => onTabChange(menu.id)}
              style={{
                width: '100%',
                padding: '12px 16px',
                textAlign: 'left',
                borderRadius: '8px',
                border: isActive ? `1px solid ${LuxuryPalette.lightGold}` : '1px solid transparent',
                backgroundColor: isActive ? LuxuryPalette.lightGreen : 'transparent',
                color: isActive ? '#FFFFFF' : LuxuryPalette.textDark,
                fontWeight: isActive ? '700' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {menu.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}