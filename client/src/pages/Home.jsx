import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import ContactForm from "../components/ContactForm";
import ContactTable from "../components/ContactTable";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-4 bg-#202 text-white min-h-screen max-w-screen-xl">
      <div className="flex justify-between items-center mb-4">
        {/* Create New Contact Button */}
        <Button
          variant="contained"
          style={{
            backgroundColor: "#1f2937", // Dark gray background
            color: "#e5e7eb", // Light gray text color
            border: "1px solid #4b5563", // Border for visual contrast
          }}
          startIcon={<AddIcon />}
          onClick={handleOpen}
          className="hover:bg-gray-700"
        >
          Create New Contact
        </Button>
        <div className="text-2xl font-bold">CONTACT CRM</div>
        {/* Search Box */}
        <Box className="flex items-center">
          <TextField
            label="🔍 Search Contacts"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="mr-2"
            InputProps={{
              style: {
                backgroundColor: "#1f2937", // Dark background for search box
                color: "#e5e7eb", // Light text
              },
            }}
            InputLabelProps={{
              style: { color: "#9ca3af" }, // Light gray label
            }}
          />
        </Box>
      </div>

      {/* Dialog for Contact Form */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: "#1f2937", // Dark gray dialog background
            color: "#e5e7eb", // Light text color
          },
        }}
      >
        <DialogContent>
          <ContactForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>

      {/* Pass the search query to the ContactTable */}
      <ContactTable searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
