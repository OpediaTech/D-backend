const jwt = require("jsonwebtoken") ;

const generateToken = (id) => {
  return jwt.sign({ id }, "dihan", {
    expiresIn: "30d",
  });
};


module.exports =  generateToken

