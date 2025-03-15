import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Css/creationM.css';
import Sidebar from './Sidebar';

function SignupManager() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin',  // Role set to admin for this form
  });

  const [error, setError] = useState('');
  const [admins, setAdmins] = useState([]); // To store admins fetched from API
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users and filter for admins
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        const adminUsers = response.data.filter(user => user.role === 'admin');
        setAdmins(adminUsers);
      } catch (err) {
        console.error('Error fetching admin users:', err);
      }
    };
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        alert('Manager created successfully!');
        navigate('/dashboard');  // Redirects to dashboard after registration
      } else {
        alert(response.data.message || 'Failed to create Manager.');
      }
    } catch (error) {
      console.error('API call failed:', error.response || error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="AdminCours">
      <Sidebar />
      
    <Box className="creationM-container">
      

      <Typography variant="h4" gutterBottom>
        Manager Signup
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className="creationM-field">
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} className="creationM-field">
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} className="creationM-field">
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} className="creationM-field">
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            type="submit"
            className="creationM-button"
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
      </form>
      {error && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Admin Users Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        List of Admins
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin._id}>
                <TableCell sx={{ color: 'white' }}>{admin.firstName}</TableCell>
                <TableCell sx={{ color: 'white' }}>{admin.lastName}</TableCell>
                <TableCell sx={{ color: 'white' }}>{admin.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
      </div>
  );
}

export default SignupManager;
