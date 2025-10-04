
import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { adminProductsData } from './mockData';

const AdminProductsPage = () => {
  const [products, setProducts] = useState(adminProductsData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '', description: '', price: '', buyPrice: '', weight: '', dimensions: '', category: '', stock: '', images: []
  });
  const [imageInputType, setImageInputType] = useState('url'); // 'url' or 'file'
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (formValues.images && formValues.images.length > 0) {
      setImagePreviews(formValues.images);
    } else {
      setImagePreviews([]);
    }
  }, [formValues.images]);

  const handleOpenDialog = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setFormValues({ ...product, images: product.images || [] });
      setImageInputType('url'); // Assume existing images are URLs
      setImagePreviews(product.images || []); // Populate previews with existing images
    } else {
      setFormValues({ name: '', description: '', price: '', category: '', stock: '', images: [] });
      setImageInputType('url');
      setImagePreviews([]);
    }
    setSelectedFiles([]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormValues({ name: '', description: '', price: '', category: '', stock: '', images: [] });
    setImageInputType('url');
    setSelectedFiles([]);
    setImagePreviews([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageUrlChange = (index, value) => {
    const newImages = [...formValues.images];
    newImages[index] = value;
    setFormValues({ ...formValues, images: newImages });
  };

  const handleAddImageUrlField = () => {
    setFormValues({ ...formValues, images: [...formValues.images, ''] });
  };

  const handleRemoveImageUrlField = (index) => {
    const newImages = formValues.images.filter((_, i) => i !== index);
    setFormValues({ ...formValues, images: newImages });
  };

  const handleImageFileChange = (e) => {
    const newSelectedFiles = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...newSelectedFiles]);

    newSelectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImagePreview = (indexToRemove) => {
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove)); // Also remove the file itself
  };

  const handleSubmit = () => {
    let finalImages = [];
    if (imageInputType === 'url') {
      finalImages = formValues.images.filter(url => url.trim() !== '');
    } else if (imageInputType === 'file') {
      finalImages = imagePreviews; // Use the Data URLs from previews
    }

    const productToSave = { ...formValues, images: finalImages, price: parseFloat(formValues.price), buyPrice: parseFloat(formValues.buyPrice), stock: parseInt(formValues.stock), weight: formValues.weight, dimensions: formValues.dimensions };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productToSave, id: editingProduct.id } : p));
    } else {
      const newProduct = { ...productToSave, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };



  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="div">
          Manage Products
        </Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>Add Product</Button>
      </Box>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Buy Price</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Dimensions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell><img src={row.images[0]} alt={row.name} style={{ width: 50, height: 50, borderRadius: '4px' }} /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>${row.buyPrice.toFixed(2)}</TableCell>
                <TableCell>${row.price.toFixed(2)}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>{row.weight}</TableCell>
                <TableCell>{row.dimensions}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(row)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" name="name" label="Product Name" type="text" fullWidth variant="outlined" value={formValues.name} onChange={handleChange} />
          <TextField margin="dense" name="description" label="Description" type="text" fullWidth variant="outlined" value={formValues.description} onChange={handleChange} />
          <TextField margin="dense" name="price" label="Price" type="number" fullWidth variant="outlined" value={formValues.price} onChange={handleChange} />
          <TextField margin="dense" name="buyPrice" label="Buy Price" type="number" fullWidth variant="outlined" value={formValues.buyPrice} onChange={handleChange} />

          <TextField margin="dense" name="category" label="Category" type="text" fullWidth variant="outlined" value={formValues.category} onChange={handleChange} />
          <TextField margin="dense" name="stock" label="Stock" type="number" fullWidth variant="outlined" value={formValues.stock} onChange={handleChange} />
          <TextField margin="dense" name="weight" label="Weight" type="text" fullWidth variant="outlined" value={formValues.weight} onChange={handleChange} />
          <TextField margin="dense" name="dimensions" label="Dimensions" type="text" fullWidth variant="outlined" value={formValues.dimensions} onChange={handleChange} />
          
          <FormControl component="fieldset" margin="dense">
            <FormLabel component="legend">Image Source</FormLabel>
            <RadioGroup row value={imageInputType} onChange={(e) => setImageInputType(e.target.value)}>
              <FormControlLabel value="url" control={<Radio />} label="Image URL" />
              <FormControlLabel value="file" control={<Radio />} label="Upload File" />
            </RadioGroup>
          </FormControl>

          {imageInputType === 'url' ? (
            <Box>
              {formValues.images.map((imageUrl, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TextField 
                    margin="dense" 
                    label={`Image URL ${index + 1}`} 
                    type="text" 
                    fullWidth 
                    variant="outlined" 
                    value={imageUrl} 
                    onChange={(e) => handleImageUrlChange(index, e.target.value)} 
                  />
                  <IconButton onClick={() => handleRemoveImageUrlField(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={handleAddImageUrlField} variant="outlined" sx={{ mt: 1 }}>Add Image URL</Button>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleImageFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  Upload Images
                </Button>
              </label>
              {selectedFiles.length > 0 && <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>{selectedFiles.length} files selected</Typography>}
            </Box>
          )}

          {imagePreviews.length > 0 && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2">Image Previews:</Typography>
              <Grid container spacing={1} sx={{ mt: 1, justifyContent: 'center' }}>
                {imagePreviews.map((preview, index) => (
                  <Grid item key={index} sx={{ position: 'relative' }}>
                    <img src={preview} alt={`Preview ${index}`} style={{ maxWidth: 100, maxHeight: 100, border: '1px solid #ddd', borderRadius: '4px' }} />
                    <IconButton 
                      size="small" 
                      color="error" 
                      sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'background.paper' }}
                      onClick={() => handleRemoveImagePreview(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>{editingProduct ? 'Save Changes' : 'Add Product'}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdminProductsPage;