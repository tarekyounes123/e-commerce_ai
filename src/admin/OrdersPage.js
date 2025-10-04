
import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ordersData } from './mockData';

const getStatusChip = (status) => {
  let color;
  switch (status) {
    case 'Shipped':
      color = 'info';
      break;
    case 'Processing':
      color = 'warning';
      break;
    case 'Delivered':
      color = 'success';
      break;
    case 'Cancelled':
      color = 'error';
      break;
    default:
      color = 'default';
  }
  return <Chip label={status} color={color} />;
};

const OrdersPage = () => {
  const [orders, setOrders] = useState(ordersData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formValues, setFormValues] = useState({
    customer: '', date: '', amount: '', status: 'Processing'
  });

  const handleOpenDialog = (order = null) => {
    setEditingOrder(order);
    if (order) {
      setFormValues(order);
    } else {
      setFormValues({ customer: '', date: '', amount: '', status: 'Processing' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingOrder(null);
    setFormValues({ customer: '', date: '', amount: '', status: 'Processing' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...formValues, id: editingOrder.id } : o));
    } else {
      const newOrder = { ...formValues, id: orders.length + 1, amount: parseFloat(formValues.amount) };
      setOrders([...orders, newOrder]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="div">
          Manage Orders
        </Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>Add Order</Button>
      </Box>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>${row.amount.toFixed(2)}</TableCell>
                <TableCell>{getStatusChip(row.status)}</TableCell>
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
        <DialogTitle>{editingOrder ? 'Edit Order' : 'Add Order'}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" name="customer" label="Customer Name" type="text" fullWidth variant="outlined" value={formValues.customer} onChange={handleChange} />
          <TextField margin="dense" name="date" label="Order Date" type="date" fullWidth variant="outlined" value={formValues.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField margin="dense" name="amount" label="Amount" type="number" fullWidth variant="outlined" value={formValues.amount} onChange={handleChange} />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formValues.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value={"Processing"}>Processing</MenuItem>
              <MenuItem value={"Shipped"}>Shipped</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
              <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>{editingOrder ? 'Save Changes' : 'Add Order'}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default OrdersPage;
