var appRouter = function(app) {

  users = require('../db_users.json');
  houses = require('../db_houses.json');

  //GET hello world http://localhost:3000
  app.get("/", function(req, res) {
    res.send("Hello World");
  });

  //GET esempio chiamata con parametri http://localhost:3000/account?username=nraboy
  app.get("/account", function(req, res) {
    var accountMock = {
      "username": "nraboy",
      "password": "1234",
      "twitter": "@nraboy"
    }

    console.log(req.query); //parametri dopo il ?

    if(!req.query.username) {
      return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
      return res.send({"status": "error", "message": "wrong username"});
    } else {
      return res.send(accountMock);
    }
  });


  // GET esempio chiamata con parametro http://localhost:3000/user/1
  app.param('id', function (req, res, next, id) {
    console.log("Called id: ", id);
    next();
  });

  app.get('/user/:id', function (req, res) {
    console.log(req.params); //parametri dopo lo slash
    res.send(users[req.params.id - 1]);
  });

  // GET esempio get all users
  app.get('/users', function (req, res) {
    res.send(users);
  });

  //GET esempio get all houses
  app.get('/houses', function (req, res) {
    res.send(houses);
  });

  app.get('/house/:id', function (req, res) {
    console.log(req.params); //parametri dopo lo slash
    res.send(houses[req.params.id - 1]);
  });

  // POST example (usare postman e inserire tutti e tre i parametri nella chiamata)
  app.post("/account", function(req, res) {
    if(!req.body.username || !req.body.password || !req.body.twitter) {
      return res.send({"status": "error", "message": "missing a parameter"});
    } else {
      return res.send(req.body);
    }
  });

}

module.exports = appRouter;
