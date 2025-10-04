
import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Laptop', price: 999, images: ['https://picsum.photos/seed/laptop/600/400'], description: 'A high-performance laptop for all your needs.' },
  { id: 2, name: 'Smartphone', price: 699, images: ['https://picsum.photos/seed/smartphone/600/400'], description: 'The latest smartphone with a stunning display.' },
  { id: 3, name: 'Headphones', price: 199, images: ['https://picsum.photos/seed/headphones/600/400'], description: 'Noise-cancelling headphones for an immersive experience.' },
  { id: 4, name: 'Keyboard', price: 129, images: ['https://picsum.photos/seed/keyboard/600/400'], description: 'A mechanical keyboard for the best typing experience.' },
  { id: 5, name: 'Mouse', price: 49, images: ['https://picsum.photos/seed/mouse/600/400'], description: 'A high-precision gaming mouse.' },
  { id: 6, name: 'Monitor', price: 399, images: ['https://picsum.photos/seed/monitor/600/400'], description: 'A 4K monitor with vibrant colors.' },
];

const ProductList = () => {
  return (
    <Grid container spacing={4} sx={{ mt: 2 }}>
      {products.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
