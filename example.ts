// Optional, if needed
// import "dotenv/config";

import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

await client.query(
  "INSERT INTO vegetables (name, classification) VALUES ('Lettuce', 'Leaves') RETURNING *"
);

const res = await client.query("SELECT * FROM vegetables");

const vegetables = res.rows;

console.log({ vegetables });

await client.end();
