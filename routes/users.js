const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyUser = require("../middlewares/verifyUser");

router.put("/:id", verifyToken, verifyUser, (req, res) => {
  res.send("User updated successfully");
});

router.delete("/:id", verifyToken, verifyUser, (req, res) => {
  res.send("User deleted successfully");
});
router.get("/me", verifyToken, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

module.exports = router;