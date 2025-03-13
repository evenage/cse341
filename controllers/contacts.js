const db = require("../data/db");
const ObjectID = require("mongodb").ObjectID;

const getAll = async (req, res) => {
  const result = await db.getDatabase.db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

const getSingle = async (req, res) => {
  const contactId = new ObjectID(req.params.id);
  const result = await db.getDatabase.db().collection("contacts").find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

module.exports = {
  getAll,
  getSingle,
};
