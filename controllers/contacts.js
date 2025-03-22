const db = require("../data/db");
const { ObjectId } = require("mongodb");
// database = db.getDatabase().collection("contacts");

// ✅ Get all contacts
const getAll = async (req, res) => {
  try {
    const result = await db.getDatabase().collection('contacts').find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error fetching all contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

// ✅ Get a single contact by ID
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await db.getDatabase().collection('contacts').findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error fetching single contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

// ✅ Create a new contact
const createContacts = async (req, res) => {
  try {
    const contact = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      color: req.body.color,
      birthday: req.body.birthday,
    };

    const response = await db.getDatabase().collection('contacts').insertOne(contact);
    
    if (response.acknowledged) {
      res.status(201).json({ message: "Contact created successfully" });
    } else {
      res.status(500).json({ error: "Failed to create contact" });
    }
  } catch (error) {
    console.error("❌ Error creating contact:", error);
    res.status(500).json({ error: "An error occurred while creating the contact." });
  }
};

// ✅ Update a contact
const updateContacts = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const updatedData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        color: req.body.color,
        birthday: req.body.birthday,
    };

    const response = await db.getDatabase().collection('contats').updateOne({ _id: contactId }, { $set: updatedData });
    
    if (response.acknowledged ) {
      res.status(200).json({ message: "Contact updated successfully" });
    } else {
      res.status(404).json({ error: "Contact not found or no changes were made" });
    }
  } catch (error) {
    console.error("❌ Error updating contact:", error);
    res.status(500).json({ error: "An error occurred while updating the contact." });
  }
};

// ✅ Delete a contact
const deleteContacts = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    
    const existingContact = await db.getDatabase().collection('contacts').findOne({ _id: contactId });
    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const response = await db.getDatabase().collection('contacts').deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "Failed to delete contact" });
    }
  } catch (error) {
    console.error("❌ Error deleting contact:", error);
    res.status(500).json({ error: "An error occurred while deleting the contact." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContacts,
  updateContacts,
  deleteContacts,
};