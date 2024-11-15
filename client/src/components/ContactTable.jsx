import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  updateContact,
  deleteContact,
} from "../features/contacts/contactSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditContactDialog from "./EditContactdialog";

const ContactTable = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.data);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (contactToDelete) {
      try {
        await dispatch(deleteContact(contactToDelete._id)).unwrap();
        toast.success("Contact deleted successfully");
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact");
      } finally {
        setConfirmationDialogOpen(false);
      }
    }
  };

  const handleOpenConfirmationDialog = (contact) => {
    setContactToDelete(contact);
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
    setContactToDelete(null);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div>
      <TableContainer
        component={Paper}
        className="mt-4"
        style={{ backgroundColor: "#1f1f1f" }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#333" }}>
              <TableCell style={{ color: "#e5e5e5",borderBottom : "rgb(224 224 224 / 50%)" }}>
                <h2 className="font-bold">First Name</h2>
              </TableCell>
              <TableCell style={{ color: "#e5e5e5",borderBottom : "rgb(224 224 224 / 50%)" }}>
                <h2 className="font-bold">Last Name</h2>
              </TableCell>
              <TableCell style={{ color: "#e5e5e5",borderBottom : "rgb(224 224 224 / 50%)" }}>
                <h2 className="font-bold">Email</h2>
              </TableCell>
              <TableCell style={{ color: "#e5e5e5",borderBottom : "rgb(224 224 224 / 50%)" }}>
                <h2 className="font-bold">Phone Number</h2>
              </TableCell>
              <TableCell style={{ color: "#e5e5e5",borderBottom : "rgb(224 224 224 / 50%)" }}>
                <h2 className="font-bold">Company</h2>
              </TableCell>
              <TableCell style={{ color: "#e5e5e5",borderBottom : "rgb(224 224 224 / 50%)" }}>
                <h2 className="font-bold">Job Title</h2>
              </TableCell>
              <TableCell style={{ color: "#e5e5e5",borderBottom : "rgb(224 224 224 / 50%)" }}>
                <h2 className="font-bold">Action</h2>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contact) => (
                <TableRow
                  key={contact._id}
                  sx={{
                    backgroundColor: "#2b2b2b",
                    borderBottom: "1px solid rgb(224 224 224 / 30%)", // Custom border
                    "&:last-child": {
                      borderBottom: "none", // Removes border for the last row
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#ffffff",
                      borderBottom: "1px solid rgb(224 224 224 / 30%)"
                    }}
                  >
                    {contact.firstName}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#ffffff",
                      borderBottom: "1px solid rgb(224 224 224 / 30%)",
                    }}
                  >
                    {contact.lastName}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#ffffff",
                      borderBottom: "1px solid rgb(224 224 224 / 30%)",
                    }}
                  >
                    {contact.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#ffffff",
                      borderBottom: "1px solid rgb(224 224 224 / 30%)",
                    }}
                  >
                    {contact.phoneNumber}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#ffffff",
                      borderBottom: "1px solid rgb(224 224 224 / 30%)",
                    }}
                  >
                    {contact.company}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#ffffff",
                      borderBottom: "1px solid rgb(224 224 224 / 30%)",
                    }}
                  >
                    {contact.jobTitle}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#ffffff",
                      borderBottom: "1px solid rgb(224 224 224 / 30%)",
                    }}
                  >
                    <IconButton
                      onClick={() => handleEdit(contact)}
                      sx={{ color: "#90caf9" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenConfirmationDialog(contact)}
                      sx={{ color: "#ef5350" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Custom Pagination */}
      <div
        className="flex justify-between items-center mt-4"
        style={{ color: "#ffffff" }}
      >
        {/* Prev button on the left */}
        {page > 0 && (
          <Button
            variant="outlined"
            onClick={() => handleChangePage(page - 1)}
            style={{ borderColor: "#ffffff", color: "#ffffff" }}
          >
            Prev
          </Button>
        )}

        {/* Centered Page Numbers */}
        <div className="flex justify-center flex-grow gap-2">
          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={page === pageNumber ? "contained" : "outlined"}
              onClick={() => handleChangePage(pageNumber)}
              style={{
                backgroundColor: page === pageNumber ? "#90caf9" : "#1f1f1f",
                color: "#ffffff",
                borderColor: "#ffffff",
              }}
            >
              {pageNumber + 1}
            </Button>
          ))}
        </div>

        {/* Next button on the right */}
        {page < totalPages - 1 && (
          <Button
            variant="outlined"
            onClick={() => handleChangePage(page + 1)}
            style={{ borderColor: "#ffffff", color: "#ffffff" }}
          >
            Next
          </Button>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
        PaperProps={{
          style: { backgroundColor: "#1f1f1f", color: "#ffffff" },
        }}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this contact?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmationDialog}
            style={{ color: "#ffffff" }}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} style={{ color: "#ef5350" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {selectedContact && (
        <EditContactDialog
          open={openDialog}
          contact={selectedContact}
          onClose={handleDialogClose}
          onUpdate={(updatedContact) => {
            dispatch(updateContact(updatedContact)).then(() => {
              toast.success("Contact updated successfully");
              handleDialogClose();
            });
          }}
        />
      )}
    </div>
  );
};

export default ContactTable;
