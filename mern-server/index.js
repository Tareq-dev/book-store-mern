const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OU8fJF563BZnYrDzab7eIT6z0LHNTJvWK1RtCqeb1psEdXAsVRod1yjNJy61CA7ui4PzuDV0h1SoFSmgfOEu9az00CUl6IaqD"
);

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create-checkout-session", async (req, res) => {
  const { books } = req.body;
  const price = books.price * 100;
  const title = books.bookTitle;
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: title,
        },
        unit_amount: price,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/success`,
    cancel_url: `http://localhost:5173/cancel`,
  });

  res.json({ id: session.id });
});

//mongodb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://mern-book-store:k2E5ixKIDWUKtXcu@cluster0.yz2y22k.mongodb.net/?retryWrites=true&w=majority";
// "mongodb+srv://mern-book-store:k2E5ixKIDWUKtXcu@cluster0.yz2y22k.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //Create a collection of documents

    const db = client.db("BookInventory");
    const bookCollections = db.collection("books");
    const usersCollection = db.collection("users");

    //insert a book to the db:post method
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    //get all books from the database
    /*app.get("/all-books", async (req, res) => {
      const books = bookCollections.find();
      const result = await books.toArray();
      res.send(result);
    });*/

    //update a book data: patch or update methods
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      //console.log(id);
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          ...updateBookData,
        },
      };

      //update
      const result = await bookCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //delete a book data
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

    //find by category
    app.get("/all-books", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    //to get single book data
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);
      res.send(result);
    });

    // Add these routes inside the MongoClient.connect callback in server.js

    // Store user data route

    app.get("/allUsers", async (req, res) => {
      try {
        const allUsers = await usersCollection.find({}).toArray();
        res.json(allUsers);
      } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    //update user role
    // Add a new route to update the user role
    app.post("/updateUserRole", async (req, res) => {
      const { uid, newRole } = req.body;

      try {
        const result = await usersCollection.updateOne(
          { uid },
          { $set: { role: newRole } }
        );

        if (result.modifiedCount > 0) {
          return res.status(200).send("User role updated successfully");
        } else {
          return res.status(404).send("User not found");
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
    });

    //Post user Data
    app.post("/storeUserData", (req, res) => {
      const { uid, username, email } = req.body;
      usersCollection.updateOne(
        { uid },
        { $set: { uid, username, email }, $setOnInsert: { role: "user" } },
        { upsert: true },
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
          }
          res.status(200).send("User data stored successfully");
        }
      );
    });

    // Check if user exists route
    app.post("/checkUserExistence", async (req, res) => {
      try {
        const { uid } = req.body;

        const user = await usersCollection.findOne({ uid });

        if (user) {
          res.json({ exists: true });
        } else {
          res.json({ exists: false });
        }
      } catch (error) {
        console.error("Error checking user existence:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
