import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API endpoints
const baseURL = 'http://localhost:8000/api/v1';

// Async Thunks for CRUD operations

// Fetch all contacts
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/getAllContacts`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create a new contact
export const createContact = createAsyncThunk('contacts/createContact', async (newContact, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/createContact`, newContact);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete a contact
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${baseURL}/deleteContact/${id}`);
    return id; // Return the deleted contact ID to update the state
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update a contact
export const updateContact = createAsyncThunk('contacts/updateContact', async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${baseURL}/updateContact/${id}`, updatedData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Initial state
const initialState = {
  data: [],  // Updated to 'data' to match the ContactTable's selector
  loading: false,
  error: null,
};

// Contact slice
const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a contact
      .addCase(createContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);  // Updated to 'data'
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(contact => contact._id !== action.payload); // Updated to 'data'
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update a contact
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map(contact =>
          contact._id === action.payload._id ? action.payload : contact // Updated to 'data'
        );
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default contactSlice.reducer;
