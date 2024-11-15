import express from 'express'
import { createContact, getAllContacts,updateContactById, deleteContactById } from '../controllers/contactController.js';
import { validateContact } from '../validators/contactValidator.js';

const router = express.Router();

router.post('/createContact', validateContact,createContact);
router.get("/getAllContacts" ,  getAllContacts);
router.put("/updateContact/:id",validateContact, updateContactById);
router.delete("/deleteContact/:id", deleteContactById);

export default router;