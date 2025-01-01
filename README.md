# Permalist Project

Permalist is a simple to-do list application built using Node.js, Express, EJS, and PostgreSQL. This project allows users to add, edit, and delete items from a to-do list. The list items are stored in a PostgreSQL database.

## Features

- Add new items to the to-do list
- Edit existing items
- Delete items from the list
- Persistent storage using PostgreSQL

## Prerequisites

- Node.js
- PostgreSQL

## Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/permalist.git
cd permalist

2. Install the dependencies:
   npm install


3. Set up the PostgreSQL database:

psql -U postgres
CREATE DATABASE permalist;
\c permalist
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

4. Update the database configuration in index.js:

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "yourpassword",
  port: 5432,
});


## Usage:

1. Start the server:
npm start

2. Open your browser and navigate to http://localhost:3000.

Project Structure:

index.js: Main server file
public/: Static files (CSS, images, etc.)
views/: EJS templates
views/partials/: Header and footer partials
package.json: Project metadata and dependencies

Routes:

GET /: Display the to-do list
POST /add: Add a new item to the list
POST /edit: Edit an existing item
POST /delete: Delete an item from the list
License
This project is licensed under the MIT License.
```
