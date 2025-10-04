
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button, List, ListItem, ListItemText, Divider, Rating, MobileStepper, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

// Mock data - in a real app, you'd fetch this based on the id
const productsData = [
  {
    id: 1, name: 'Laptop', price: 999, 
    images: [
      'https://picsum.photos/seed/laptop1/1200/800',
      'https://picsum.photos/seed/laptop2/1200/800',
      'https://picsum.photos/seed/laptop3/1200/800',
    ],
    description: 'A high-performance laptop for all your needs. Features a 15.6-inch display, 16GB RAM, and 512GB SSD.',
    weight: '2.2 kg',
    dimensions: '35.79 x 24.59 x 1.62 cm',
    reviews: [
      { id: 1, author: 'John Doe', rating: 5, comment: 'Excellent laptop! Very fast and reliable.' },
      { id: 2, author: 'Jane Smith', rating: 4, comment: 'Good value for the price, but the battery could be better.' },
    ]
  },
  // Add more products with full details here...
];

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id)) || { ...productsData[0], id: parseInt(id) };
    setProduct(foundProduct);
    setActiveStep(0);
  }, [id]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReviewSubmit = () => {
    if (newReviewComment.trim() === '' || newReviewAuthor.trim() === '') return;
    const newReview = {
      id: Date.now(),
      author: newReviewAuthor,
      rating: newReviewRating,
      comment: newReviewComment,
    };
    setProduct(prev => ({ ...prev, reviews: [...prev.reviews, newReview] }));
    setNewReviewAuthor('');
    setNewReviewRating(5);
    setNewReviewComment('');
  };

  if (!product) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  const maxSteps = product.images.length;

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Paper elevation={3} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: 600, flexGrow: 1, margin: 'auto' }}>
              <img 
                src={product.images[activeStep]}
                alt={`${product.name} ${activeStep + 1}`}
                style={{ maxHeight: '400px', display: 'block', objectFit: 'cover', overflow: 'hidden', width: '100%' }}
              />
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>Next<KeyboardArrowRight /></Button>}
                backButton={<Button size="small" onClick={handleBack} disabled={activeStep === 0}><KeyboardArrowLeft />Back</Button>}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="h1" variant="h4" sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} gutterBottom>{product.name}</Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>${product.price}</Typography>
            <Typography variant="body1" paragraph>{product.description}</Typography>
            <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button variant="contained" color="primary" size="large" sx={{ mb: { xs: 2, sm: 0 }, mr: { xs: 0, sm: 2 } }}>Add to Cart</Button>
              <Button variant="outlined" color="secondary" size="large" component={Link} to={`/chat?product=${product.id}`}>
                Chat with Supplier
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: { xs: 1, sm: 2, md: 3 }, mt: 3 }}>
        <Typography variant="h5" gutterBottom>Product Details</Typography>
        <List>
          <ListItem><ListItemText primary="Weight" secondary={product.weight} /></ListItem>
          <Divider />
          <ListItem><ListItemText primary="Dimensions" secondary={product.dimensions} /></ListItem>
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: { xs: 1, sm: 2, md: 3 }, mt: 3 }}>
        <Typography variant="h5" gutterBottom>Customer Reviews</Typography>
        <List>
          {product.reviews.map(review => (
            <React.Fragment key={review.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={review.author}
                  secondary={
                    <>
                      <Rating value={review.rating} readOnly size="small" />
                      <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">{review.comment}</Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>Write a Review</Typography>
          <TextField label="Your Name" variant="outlined" fullWidth margin="normal" value={newReviewAuthor} onChange={(e) => setNewReviewAuthor(e.target.value)} />
          <Rating value={newReviewRating} onChange={(e, newValue) => { setNewReviewRating(newValue); }} />
          <TextField label="Your Review" variant="outlined" fullWidth multiline rows={4} margin="normal" value={newReviewComment} onChange={(e) => setNewReviewComment(e.target.value)} />
          <Button variant="contained" color="primary" onClick={handleReviewSubmit} sx={{ mt: 1 }}>Submit Review</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetailsPage;
