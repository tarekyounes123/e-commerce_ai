
export const chartData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
  { name: 'Jul', sales: 7000 },
];

export const summaryData = {
  totalSales: '75,392',
  newOrders: '3,152',
  totalUsers: '1,254',
};

export const ordersData = [
  { id: 1, customer: 'John Doe', date: '2025-10-04', amount: 150.00, status: 'Shipped' },
  { id: 2, customer: 'Jane Smith', date: '2025-10-04', amount: 75.50, status: 'Processing' },
  { id: 3, customer: 'Bob Johnson', date: '2025-10-03', amount: 250.25, status: 'Delivered' },
  { id: 4, customer: 'Alice Williams', date: '2025-10-02', amount: 50.00, status: 'Cancelled' },
  { id: 5, customer: 'Charlie Brown', date: '2025-10-01', amount: 300.00, status: 'Delivered' },
];

export const adminProductsData = [
  { id: 1, name: 'Laptop Pro', description: 'High-performance laptop with 16GB RAM.', price: 1200, buyPrice: 1000, weight: '2.2 kg', dimensions: '35x24x1.6cm', category: 'Electronics', stock: 50, images: ['https://picsum.photos/seed/adminlaptop1/100/100', 'https://picsum.photos/seed/adminlaptop2/100/100'] },
  { id: 2, name: 'Gaming Mouse', description: 'Ergonomic gaming mouse with RGB lighting.', price: 75, buyPrice: 50, weight: '0.1 kg', dimensions: '12x7x4cm', category: 'Accessories', stock: 120, images: ['https://picsum.photos/seed/adminmouse1/100/100', 'https://picsum.photos/seed/adminmouse2/100/100'] },
  { id: 3, name: 'USB-C Hub', description: '7-in-1 USB-C hub for all your peripherals.', price: 45, buyPrice: 30, weight: '0.05 kg', dimensions: '10x3x1cm', category: 'Accessories', stock: 200, images: ['https://picsum.photos/seed/adminhub1/100/100', 'https://picsum.photos/seed/adminhub2/100/100'] },
];

export const adminUsersData = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Regular User', email: 'user@example.com', role: 'Customer', status: 'Active' },
  { id: 3, name: 'Inactive User', email: 'inactive@example.com', role: 'Customer', status: 'Inactive' },
];
