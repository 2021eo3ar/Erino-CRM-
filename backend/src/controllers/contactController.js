
import Contact from "../models/contactModel.js";

// create a contact
 export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.log("An error occured while creating contact", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// get All saved contacts
 export const getAllContacts = async (req, res) => {
  try {
    const contacts =await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// update contact by Id
 export const updateContactById = async (req, res) => {
  try {
    const contact =await  Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contact) {
      res
        .status(404)
        .json({
          success: false,
          message: "There is no such Contact in the Database",
        });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// delete contact by Id

 export const deleteContactById = async(req,res) =>{
    try {
        const contact =await Contact.findByIdAndDelete(req.params.id);
        if(!contact){
            res.staust(400).json({success:false, message: "no such contact found in Database"})
        }
        res.status(200).json({success:true, message:"Contact is deleted succuessfully"})
    } catch (error) {
        res.status(400).json({success:false, message : error.message})
    }
};

