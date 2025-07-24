const verifyUser = (req, res, next) => {
  try {
    const userIdFromToken = req.user.id;
    const userIdFromParams = req.params.id;

    if (userIdFromToken === userIdFromParams) {
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized: You can only modify your own account" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = verifyUser;
