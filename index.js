import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "PlayPostgres321",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC"); // we are selecting all the items from the items table and ordering them by id in ascending order
    items = result.rows; // we are storing the result in the items array

    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// steps to solve the exercise:
// 1. create a new database in pgaadmin called permalist with a table called items
// 2. insert to the items table some test data (id, title) (you can see it in line 10)
// 3. we want to be able to read the data from the database and display it in the browser. we do it by using the get method and the query method in line 18. and send the data to the index.ejs file.
// 4. before we can access the data from the database we need to install the pg package by running the command npm install pg
// 5. we need to import the pg package in line 2
// 6. we need to create a new client in line 10
// 7. we need to connect to the database in line 11
// 8. we need to use the query method in line 28 to get the data from the database
// 9. we need to store the data in the items array in line 29
// 10. we need to send the data to the index.ejs file in line 31
