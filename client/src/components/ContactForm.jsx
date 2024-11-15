import React, { useState } from 'react';
import { Box, TextField, Button, Container, Typography, IconButton } from '@mui/material';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../features/contacts/contactSlice';
import { toast, ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import 'react-toastify/dist/ReactToastify.css';

// Zod schema for validation
const contactSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  phoneNumber: z.string()
    .min(10, { message: 'Phone number must be at least 10 characters' })
    .regex(/^\d+$/, { message: 'Phone number must only contain digits' }), // Ensures only digits are entered
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

const ContactForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contacts);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zod validation
    try {
      contactSchema.parse(formData);

      // Dispatch Redux action
      dispatch(createContact(formData))
        .unwrap()
        .then(() => {
          toast.success('Contact created successfully!');

          // Reset form after successful submission
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            company: '',
            jobTitle: '',
          });

          // Close the dialog if submission is successful
          handleClose();
        })
        .catch((err) => {
          toast.error(`Failed to save contact: ${err}`);
        });
    } catch (validationError) {
      if (validationError.errors) {
        validationError.errors.forEach((err) => toast.error(err.message));
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="mt-8 p-4 rounded-md shadow-md relative"
      sx={{ backgroundColor: '#1E1E1E', color: '#FFFFFF' }} // Black background with white text
    >
      <ToastContainer />
      <IconButton
        aria-label="close"
        onClick={handleClose}
        style={{ position: 'absolute', top: '8px', right: '8px', color: '#FFFFFF' }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Create New Contact
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box display="grid" gap={2} gridTemplateColumns="1fr 1fr">
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
            required
            autoComplete="off" // Disable autocomplete
            sx={{
              input: { color: '#fff' },
              label: { color: '#BBBBBB' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#444444' },
                '&:hover fieldset': { borderColor: '#666666' },
                '&.Mui-focused fieldset': { borderColor: '#ffffff' },
              },
            }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange}
            required
            autoComplete="off" // Disable autocomplete
            sx={{
              input: { color: '#FFFFFF' },
              label: { color: '#BBBBBB' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#444444' },
                '&:hover fieldset': { borderColor: '#666666' },
                '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              },
            }}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            autoComplete="off" // Disable autocomplete
            sx={{
              input: { color: '#FFFFFF' },
              label: { color: '#BBBBBB' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#444444' },
                '&:hover fieldset': { borderColor: '#666666' },
                '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              },
            }}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            variant="outlined"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            autoComplete="off" // Disable autocomplete
            sx={{
              input: { color: '#FFFFFF' },
              label: { color: '#BBBBBB' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#444444' },
                '&:hover fieldset': { borderColor: '#666666' },
                '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              },
            }}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Company"
            name="company"
            fullWidth
            variant="outlined"
            value={formData.company}
            onChange={handleChange}
            autoComplete="off" // Disable autocomplete
            sx={{
              input: { color: '#FFFFFF' },
              label: { color: '#BBBBBB' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#444444' },
                '&:hover fieldset': { borderColor: '#666666' },
                '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              },
            }}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Job Title"
            name="jobTitle"
            fullWidth
            variant="outlined"
            value={formData.jobTitle}
            onChange={handleChange}
            autoComplete="off" // Disable autocomplete
            sx={{
              input: { color: '#FFFFFF' },
              label: { color: '#BBBBBB' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#444444' },
                '&:hover fieldset': { borderColor: '#666666' },
                '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              },
            }}
          />
        </Box>
        <Box mt={4}>
          <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ backgroundColor: '#333333', color: '#FFFFFF', '&:hover': { backgroundColor: '#555555' } }}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactForm;
