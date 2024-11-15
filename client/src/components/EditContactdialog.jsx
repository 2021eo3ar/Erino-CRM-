import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateContact } from '../features/contacts/contactSlice'; // Adjust the import path as needed
import { toast } from 'react-toastify';

const EditContactDialog = ({ open, contact, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        company: contact.company,
        jobTitle: contact.jobTitle
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (contact) {
      dispatch(updateContact({ id: contact._id, updatedData: formData }))
        .unwrap()
        .then((updatedContact) => {
          onUpdate(updatedContact);
          toast.success('Contact updated successfully');
          onClose();
        })
        .catch((error) => {
          console.error('Error updating contact:', error);
          toast.error('Failed to update contact');
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: '#121212', color: '#ffffff', border: "2px solid white" } }}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          autoComplete="off" 
          InputLabelProps={{ style: { color: '#cccccc' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          autoComplete="off"
          InputLabelProps={{ style: { color: '#cccccc' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off" 
          InputLabelProps={{ style: { color: '#cccccc' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          autoComplete="off"
          InputLabelProps={{ style: { color: '#cccccc' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />
        <TextField
          label="Company"
          fullWidth
          margin="normal"
          name="company"
          value={formData.company}
          onChange={handleChange}
          autoComplete="off"
          InputLabelProps={{ style: { color: '#cccccc' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />
        <TextField
          label="Job Title"
          fullWidth
          margin="normal"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          autoComplete="off"
          InputLabelProps={{ style: { color: '#cccccc' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" style={{ color: '#ffffff' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" style={{ backgroundColor: '#1e88e5', color: '#ffffff' }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditContactDialog;
