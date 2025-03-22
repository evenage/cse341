const router = require("express").Router();


router.get("/", (req, res) => {
    //#swagger-tags: ['Hello from routes!']
    res.send("Hello, from routes!");
  });
  
  router.use("/contacts", require("./contacts"));
  
  module.exports = router; 
  