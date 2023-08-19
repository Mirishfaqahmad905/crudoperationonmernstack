const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'secret-key';

app.get('/', (req, res) => {
  const user = {
    id: 1,
    username: 'ahmad',
    email: 'abc@gmail.com'
  }
  jwt.sign({ user }, secretKey, { expiresIn: '2h' }, (err, token) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json({
        token
      });
    }
  });
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({
      message: 'Token is not authorized'
    });
  }
}

app.post('/profile', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        message: 'Token is not valid'
      });
    } else {
      res.json({
        message: 'Access granted',
        authData
      });
    }
  });
});

app.listen(1000, () => {
  console.log('App is running on port 1000');
});
 // explaination of this code is 
// This code is an example of how to implement authentication using JSON Web Tokens (JWT) in a Node.js Express application.

// The express and jsonwebtoken modules are imported at the beginning of the code. express is a web application framework for Node.js that provides a set of features for building web applications, while jsonwebtoken is a library for creating and verifying JWTs.

// A new express application is created using const app = express();. The secretKey constant is also defined, which is used to sign and verify JWTs.

// The root route is defined using app.get('/', (req, res) => { ... }). In this route, a user object is created, which represents the user that is requesting access to the application. The jwt.sign() function is used to generate a JWT for the user object. The first argument to jwt.sign() is an object containing the data that should be included in the token. In this case, the user object is included. The second argument is the secret key that is used to sign the token. The third argument is an options object that specifies how long the token should be valid for. In this case, the token will be valid for 2 hours. Finally, a callback function is passed to jwt.sign(). This function is called once the token has been generated. If an error occurs, an error response is sent with a 500 status code. Otherwise, a JSON response is sent with the token as the body.

// A verifyToken middleware function is defined next. This function is used to extract the JWT from the request headers and verify it using the jwt.verify() function. The middleware function is defined using (req, res, next) => { ... }. The req object contains information about the incoming request, while the res object is used to send responses back to the client. The next function is called to pass control to the next middleware function in the chain.

// The verifyToken function checks whether the Authorization header is present in the request. If it is, the JWT is extracted from the header and stored in the req.token property. The next() function is called to pass control to the next middleware function in the chain. If the Authorization header is not present, an error response is sent with a 403 status code.

// The /profile route is defined next using app.post('/profile', verifyToken, (req, res) => { ... }). This route requires a valid JWT to be present in the Authorization header. The verifyToken middleware function is passed as the second argument to the app.post() function. This ensures that the verifyToken middleware function is called before the route handler.

// In the route handler, the jwt.verify() function is used to verify the JWT that was extracted by the verifyToken middleware function. If the token is not valid, an error response is sent with a 403 status code. Otherwise, a JSON response is sent with a message indicating that access has been granted and the data contained in the token.

// Finally, the application is started using app.listen(1000, () => { ... }). This starts the server and listens for incoming requests on port 1000. When a request is received, the appropriate route handler is called.





