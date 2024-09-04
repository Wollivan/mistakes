// import our packages
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

// set the server up
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// connect to our database
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// make a GET and POST endpoint
app.get("/", function (request, response) {
  response.json("You are looking at my root route. How roude.");
});

// an endpoint that queries the database
app.get("/mistakes", async function (request, response) {
  const mistakes = await db.query("SELECT * FROM mistakes");
  response.json(mistakes.rows);
});

app.post("/mistakes", async function (request, response) {
  // get the bits of information from the request that we need
  const maker = request.body.maker;
  const blunder = request.body.blunder;

  // make a db INSERT query
  const newMistake = await db.query(
    "INSERT INTO mistakes (maker, blunder) VALUES ($1, $2)",
    [maker, blunder]
  );

  // send make the response from the database (so we know can test that it worked)
  response.json(newMistake);
});

// start the server
app.listen(8080, function () {
  console.log("App is running on port 8080");
});
