const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const bookContainer = document.getElementById("bookContainer");
    bookContainer.innerHTML = ""; 
    

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.setAttribute("data-index", index);
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            <button onclick="toggleRead(${index})">Toggle Read Status</button>
            <button onclick="removeBook(${index})">Remove</button>
        `;
        bookContainer.appendChild(bookCard);
    });
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read; // Toggle read status
    displayBooks(); // Refresh display
}

function removeBook(index) {
    myLibrary.splice(index, 1); // Remove book from library
    displayBooks(); // Refresh display
}

document.getElementById("newBookBtn").onclick = function() {
    document.getElementById("bookDialog").showModal();
};

document.getElementById("bookForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read); // Add the book
    document.getElementById("bookDialog").close(); // Close the dialog
    document.getElementById("bookForm").reset(); // Reset the form
};

document.getElementById("closeDialog").onclick = function() {
    document.getElementById("bookDialog").close(); 
};


addBookToLibrary("Harry Potter", "J.K. Rowling", 400, true);
addBookToLibrary("Lord of the Rings", "J.R.R. Tolkien", 700, false);
