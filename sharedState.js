// Premium Brand Colors Global Configurations
export const LuxuryPalette = {
  lightGreen: "#00A859", // Core Active States & Action Buttons
  lightGold: "#D4AF37",  // High-End Hospitality Trim Borders
  silver: "#E5E7EB",     // Background Paneling & Inactive States
  cardRed: "#DC2626",    // Focused Alerts & Contextual Actions
  textDark: "#1F2937"    // Crisp Text Content
};

// Clean Product Data Array matching exact local directory image assets
export const hotelCulinaryMenu = [
  { id: "p1", name: "Cake", price: 6.00, img: "cake.jpg" },
  { id: "p2", name: "Brownie", price: 4.00, img: "food.jpg" },
  { id: "p3", name: "Waffle", price: 5.00, img: "waf.jpg" },
  { id: "p4", name: "Tiramisu", price: 6.00, img: "tiramisu.jpg" }
];

// Structural Sidebar Link Registry Mapping All Allowed Operational Access Options
export const systemSidebarMenuRegistry = [
  { id: 1, label: "1. Reservations & Bookings", allowedRoles: ["Manager", "Assistant Manager", "Receptionist"] },
  { id: 2, label: "2. Front Office Control", allowedRoles: ["Manager", "Assistant Manager", "Receptionist", "Cashier"] },
  { id: 3, label: "3. Room & Housekeeping", allowedRoles: ["Manager", "Chief of Cleaners"] },
  { id: 4, label: "4. Restaurant & Orders", allowedRoles: ["Manager", "Assistant Manager", "Food and Beverages", "Chief of Kitchen", "Bar man", "Coffee man (Barista)", "Waiters"] },
  { id: 5, label: "5. Inventory & Stocks", allowedRoles: ["Manager", "Controller", "Store Keepers", "Chief of Kitchen"] },
  { id: 6, label: "6. Finance & Billing", allowedRoles: ["Manager", "Internal Auditor", "Accountant", "Cashier"] },
  { id: 7, label: "7. HR & Access Logs", allowedRoles: ["Manager", "HR"] },
  { id: 8, label: "8. Analytics Dashboard", allowedRoles: ["Manager", "Assistant Manager", "Controller"] },
  { id: 9, label: "9. CRM & Feedback", allowedRoles: ["Manager", "Receptionist"] }
];