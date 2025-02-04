export type Product = {
  id: number;
  product_name: string;
  category: "Electronics" | "Accessories" | "Home Appliances";
  price: number;
  stock: number;
};

export const products: Product[] = [
  { id: 1, product_name: "Wireless Mouse", category: "Electronics", price: 25, stock: 100 },
  { id: 2, product_name: "Bluetooth Speaker", category: "Electronics", price: 45, stock: 60 },
  { id: 3, product_name: "Leather Wallet", category: "Accessories", price: 30, stock: 80 },
  { id: 4, product_name: "Sports Watch", category: "Accessories", price: 70, stock: 20 },
  { id: 5, product_name: "Coffee Maker", category: "Home Appliances", price: 80, stock: 15 },
  { id: 6, product_name: "Air Fryer", category: "Home Appliances", price: 120, stock: 25 },
  { id: 7, product_name: "Smartphone Stand", category: "Accessories", price: 15, stock: 150 },
  { id: 8, product_name: "Noise Cancelling Headphones", category: "Electronics", price: 150, stock: 40 },
  { id: 9, product_name: "Electric Kettle", category: "Home Appliances", price: 35, stock: 50 },
  { id: 10, product_name: "Fitness Tracker", category: "Electronics", price: 60, stock: 70 },
  { id: 11, product_name: "Portable Power Bank", category: "Electronics", price: 40, stock: 90 },
  { id: 12, product_name: "Stainless Steel Water Bottle", category: "Accessories", price: 25, stock: 120 },
  { id: 13, product_name: "Smart Light Bulb", category: "Home Appliances", price: 20, stock: 200 },
  { id: 14, product_name: "Laptop Sleeve", category: "Accessories", price: 28, stock: 75 },
  { id: 15, product_name: "Digital Photo Frame", category: "Electronics", price: 85, stock: 30 },
  { id: 16, product_name: "Robot Vacuum Cleaner", category: "Home Appliances", price: 250, stock: 10 },
];
