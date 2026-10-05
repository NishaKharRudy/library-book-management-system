import { useState } from "react";
import axios from "axios";

function App() {

    const [formData, setFormData] = useState({
        bookTitle: "",
        authorName: "",
        isbn: "",
        category: "",
        publicationYear: ""
    });

    const [message, setMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:2800/api/books",
                formData
            );

            console.log(response.data);

            setMessage("Book added successfully!");

            // Clear form
            setFormData({
                bookTitle: "",
                authorName: "",
                isbn: "",
                category: "",
                publicationYear: ""
            });

        } catch (error) {
            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to add book"
            );
        }
    };

    return (
        <div>
            <h1>Library Book Management System</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Book Title</label>
                    <br />
                    <input
                        type="text"
                        name="bookTitle"
                        value={formData.bookTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Author Name</label>
                    <br />
                    <input
                        type="text"
                        name="authorName"
                        value={formData.authorName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>ISBN</label>
                    <br />
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Category</label>
                    <br />
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Publication Year</label>
                    <br />
                    <input
                        type="number"
                        name="publicationYear"
                        value={formData.publicationYear}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Add Book
                </button>

            </form>

            {message && (
                <h3>{message}</h3>
            )}

<div>

    <h2>Book List</h2>

    {books.map((book) => (

        <div key={book._id}>

            <h3>{book.bookTitle}</h3>

            <p>Author: {book.authorName}</p>

            <p>ISBN: {book.isbn}</p>

            <p>Category: {book.category}</p>

            <p>Publication Year: {book.publicationYear}</p>

            <hr />

        </div>

    ))}

</div>


        </div>
    );
}

export default App;