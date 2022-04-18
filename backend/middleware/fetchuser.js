const jwt = require("jsonwebtoken");
JWT_SECRET = "Thisisa$ecretJWTToken";

const fetchuser = (req, res, next) => {
  // get the user from the JWT token and add ID to request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ Error: "Please pass a valid token in the header" });
  }
  try {
    const string = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ Error: "Please authenticate using a valid token " });
  }
};

module.exports = fetchuser;
