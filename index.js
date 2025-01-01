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
    //console.log(items);

    res.render("index.ejs", {
      // we are sending the data to the index.ejs file
      listTitle: "Today", // we are sending the listTitle variable to the index.ejs file
      listItems: items, // we are sending the listItems variable to the index.ejs file
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  // we are adding a new item to the items table
  const item = req.body.newItem; // we are getting the new item from the form
  // items.push({ title: item });
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]); // we are inserting the new item to the items table
    res.redirect("/"); // we are redirecting the user to the home page
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  // we are editing an item in the items table
  const item = req.body.updatedItemTitle; // we are getting the updated item from the form
  const id = req.body.updatedItemId; // we are getting the id of the updated item from the form

  try {
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]); // we are updating the item in the items table
    res.redirect("/"); // we are redirecting the user to the home page
  } catch (err) {
    console.log(err);
  }
});

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
// 11. we want to be able to add new items to the database. we do it by using the post method and the query method in line 42
// 12. we need to install the body-parser package by running the command npm install body-parser
// 13. we need to import the body-parser package in line 2
// 14. we need to use the body-parser package in line 12
// 15. we need to get the new item from the form in line 43
// 16. we need to insert the new item to the items table in line 47
// 17. we need to redirect the user to the home page in line 48
// 18. we want to be able to edit items in the database. we do it by using the post method and the query method in line 55
