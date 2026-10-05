const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/Book");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });

// Test route
app.get("/", (req, res) => {
    res.send("Library Book Management API is running");
});
// POST API - Add a new book
app.post("/api/books", async (req, res) => {
    try {
        const {
            bookTitle,
            authorName,
            isbn,
            category,
            publicationYear
        } = req.body;

        // Validate required fields
        if (
            !bookTitle ||
            !authorName ||
            !isbn ||
            !category ||
            !publicationYear
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Create a new book
        const newBook = new Book({
            bookTitle,
            authorName,
            isbn,
            category,
            publicationYear
        });

        // Save book to MongoDB
        const savedBook = await newBook.save();

        // Send response
        res.status(201).json({
            message: "Book added successfully",
            book: savedBook
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Start server
app.listen(2800, () => {
    console.log("Server running on http://localhost:2800");
});