const libContainer = document.getElementById('lib-container');
const bookContainer = document.getElementById('book-card-container');
const newBookForm = document.forms["newBookForm"];

let myLibrary = [];
let bookCards = [];

function Book(title, author, pages, beenRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasBeenRead = beenRead;
}

function BookContainer(book) {
  this.book = book

  const newDiv = document.createElement('div');
  const bookTitle = document.createElement('h5');
  const bookAuthor = document.createElement('i');

  newDiv.classList.add('card', 'text-center', 'text-white', 'bg-dark', 'mb-3');
  newDiv.setAttribute('data-toggle', 'modal');
  newDiv.setAttribute('data-target', '#bookInfoModal');
  newDiv.append(bookTitle, bookAuthor);
  newDiv.style.margin = '2px';

  bookTitle.textContent = book.title;
  bookTitle.classList.add('card-header');
  
  bookAuthor.textContent = book.author;
  bookAuthor.classList.add('card-text');
  
  bookContainer.append(newDiv);

  this.element = newDiv;

  this.element.addEventListener('mousedown', () => {
    console.log('card clicked')
    showCardModal(this);
  });

  bookCards.push(this)
}

addBookToLibrary = (book, library) => {
  new BookContainer(book)

  book.index = library.length;
  library.push(book);
};

getFormData = () => {
  let newBookTitle = newBookForm.elements['bookTitleInput'].value;
  let newBookAuthor = newBookForm.elements['bookAuthorInput'].value;
  let newBookNumPages = newBookForm.elements['bookNumOfPagesInput'].value;
  let newBook = new Book(newBookTitle, newBookAuthor, newBookNumPages);
  addBookToLibrary(newBook, myLibrary);
}

listBooks = (library) => {
  for (let book in library) {
    console.log(library[book])
  }
};

showCardModal = (card) => {
  
  const modalDiv = document.getElementById('bookInfoModal');
  const modalDialog = modalDiv.children[0];
  const modalContent = modalDialog.children[0];

  modalContent.innerHTML = ''

  const modalHeader = document.createElement('div');
  const modalTitle = document.createElement('h5');
  
  modalHeader.classList.add('modal-header');
  
  modalTitle.classList.add('modal-title');
  modalTitle.textContent = card.book.title;

  const modalBody = document.createElement('div');
  
  const para = document.createElement('p');

  para.style.margin = '4px'
  para.textContent = 'Written by ' + card.book.author
  
  modalBody.append(para)

  const closeBtn = document.createElement('button');
  const submitBtn = document.createElement('button');

  modalHeader.append(modalTitle, closeBtn);
  modalContent.append(modalHeader, modalBody);
};


addBookToLibrary(new Book('The Tales of The Lost', 'Alfred', 420), myLibrary)
addBookToLibrary(new Book('This Is Harder Than I Thought', 'Unknown', 69), myLibrary)
addBookToLibrary(new Book('How Did it Get This Far?', 'A Wise Man', 1337), myLibrary)


listBooks(myLibrary)