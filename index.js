// implement your API here
const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

//////////////////////////// GET ////////////////////////////
server.get("/", (req, res) => {
  res.send("its working");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.status(550), json({ error: "user not found." });
    });
});

server.get("api.users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json(error);
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res.status(400).json({
        error: "user id does not exist"
      });
    });
});

/////////////////////////// POST //////////////////////////////
//new user
// on post you do Raw
server.post("/api/users", (req, res) => {
  const userData = { ...req.body };

  db.insert(userData)
    .then(user => {
      if (!userData.name || !userData.bio) {
        res.status(400).json({ error: "please enter a name and bio" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "user needs to be added" });
    });
});
////////////////////////// PUT /////////////////////////////////////////
//  you do raw
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const users = { ...req.body };
  db.update(id, users)
    .then(user => {
      if (!user.name || !user.bio) {
        res.status(400).json({ error: "please provide name and bio" });
      } else if (id === []) {
        res.status(404).json({ message: "ID doesn't exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ message: "user was not edited" });
    });
});
///////////////////////////// DELETE //////////////////////////////////

// on postman None not raw
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: " ID doesn't exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      console.log("error", error);
      res.status(500).json({ error: "can't remove user" });
    });
});

const port = 5000;
server.listen(port, () => console.log("port 5000"));
