
import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Chip, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { adminUsersData } from './mockData';

const AdminUsersPage = () => {
  const [users, setUsers] = useState(adminUsersData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '', email: '', role: 'Customer', status: 'Active'
  });

  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    if (user) {
      setFormValues(user);
    } else {
      setFormValues({ name: '', email: '', role: 'Customer', status: 'Active' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setFormValues({ name: '', email: '', role: 'Customer', status: 'Active' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...formValues, id: editingUser.id } : u));
    } else {
      const newUser = { ...formValues, id: users.length + 1 };
      setUsers([...users, newUser]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const getStatusChip = (status) => {
    let color;
    switch (status) {
      case 'Active':
        color = 'success';
        break;
      case 'Inactive':
        color = 'default';
        break;
      default:
        color = 'default';
    }
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="div">
          Manage Users
        </Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>Add User</Button>
      </Box>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
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
        <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" name="name" label="Name" type="text" fullWidth variant="outlined" value={formValues.name} onChange={handleChange} />
          <TextField margin="dense" name="email" label="Email" type="email" fullWidth variant="outlined" value={formValues.email} onChange={handleChange} />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formValues.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Customer"}>Customer</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formValues.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Inactive"}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>{editingUser ? 'Save Changes' : 'Add User'}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdminUsersPage;