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

app.post("/delete", async (req, res) => {
  // we are deleting an item from the items table
  const id = req.body.deleteItemId; // we are getting the id of the item to delete from the form
  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]); // we are deleting the item from the items table
    res.redirect("/"); // we are redirecting the user to the home page
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
