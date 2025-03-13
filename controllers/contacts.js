const db = require("../data/db");
const { ObjectId } = require("mongodb");

// Controller function to get all contacts
const getAll = async (req, res) => {
  try {
    const database = db.getDatabase();
    const result = await database.collection("contacts").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result); // Return all contacts, not just the first one
  } catch (error) {
    console.error("❌ Error fetching all contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

// Controller function to get a single contact by ID
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id); // Convert string ID to ObjectId
    const database = db.getDatabase();
    const result = await database
      .collection("contacts")
      .find({ _id: contactId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]); // Return the single contact
  } catch (error) {
    console.error("❌ Error fetching single contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

module.exports = {
  getAll,
  getSingle,
};
