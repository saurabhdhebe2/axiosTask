const express = require("express");
const app = express();
const axios = require("axios");
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Admin@123",
    database: "Languages",
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/post", async (req, res) => {
  console.log('from post1 =======>',req.body);
  await knex("profile").insert({
    id: req.body.id,
    name: req.body.name,
  });
  return res.json({
    data:req.body
  });
});

app.post("/post-user", (req, res) => {
  const data = {
    id: req.body.id,
    name: req.body.name,
  }
  axios.post("http://localhost:3001/post", data).then((result) => {
    return res.status(201).json({
      data: result.data,
    });
  });
});

app.get("/get", async (req, res) => {
  console.log('get1 ======>',req.body);
  const result = await knex.select("*").from("profile");
  return res.status(200).json({
    data: result,
  });
});

app.get("/get-users", (req, res) => {
  axios.get("http://localhost:3001/get").then((result) => {
    return res.status(200).json({
      data: result.data,
    });
  });
});

app.listen(3001, () => console.log("server is unning on 3001"));
