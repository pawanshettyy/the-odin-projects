const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = ''; // Clear previous content

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <p><strong>Title:</strong> ${book.title}</p>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
      <button onclick="removeBook(${index})">Remove</button>
      <button onclick="toggleRead(${index})">Toggle Read Status</button>
    `;
    libraryContainer.appendChild(bookCard);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleRead(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
  const dialog = document.getElementById('book-form-dialog');
  dialog.showModal();
});

document.getElementById('close-dialog').addEventListener('click', () => {
  const dialog = document.getElementById('book-form-dialog');
  dialog.close();
});

document.getElementById('book-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);

  // Reset the form
  document.getElementById('book-form').reset();
  document.getElementById('book-form-dialog').close();
});

// Add some initial books to the library for testing
addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, false));
