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

  this.element.addEventListener('mousedown', () => showCardModal(this));

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
  newBookForm.reset()
}

listBooks = (library) => {
  for (let book in library) {
    console.log(library[book])
  }
};

showCardModal = (card) => {
  const modalContent = document.getElementById('bookInfoModal').children[0].children[0];
  modalContent.innerHTML = ''

  const modalHeader = getModalHeader(card);

  const modalBody = getModalBody(card);

  const modalFooter = getModalFooter(card);
  
  modalContent.append(modalHeader, modalBody, modalFooter);
};

showEditBookModal = (card) => {
  const editBookModal = document.getElementById('newBookModal').cloneNode(true);
  const modalDialog = editBookModal.children[0];
  const modalContent = modalDialog.children[0];

  editBookModal.id = 'editBookModal';
  editBookModal.classList.add('show');
  editBookModal.style.display = 'block';
  editBookModal.removeAttribute('aria-hidden')
  console.log(editBookModal, modalDialog, modalContent);
  console.log(modalContent.children);

  libContainer.append(editBookModal);
};

getModalHeader = (card) => {
  const modalHeader = document.createElement('div');
  const modalTitle = document.createElement('h5');

  const closeBtn = getCloseBtn();
  
  modalHeader.classList.add('modal-header');
  modalHeader.style.borderBottom = '1px solid #343a40'
  
  modalTitle.classList.add('modal-title');
  modalTitle.textContent = card.book.title;
  
  modalHeader.append(modalTitle, closeBtn);

  return modalHeader;
};

getCloseBtn = () => {
  const closeBtn = document.createElement('button');

  closeBtn.classList.add('close');
  closeBtn.setAttribute('data-dismiss', 'modal');
  closeBtn.style.color = 'black';
  closeBtn.textContent = 'x';
  closeBtn.id = 'infoCloseBtn';

  return closeBtn
};

getModalBody = (card) => {
  const modalBody = document.createElement('div');
  
  const authorPara = document.createElement('p');
  const pagesPara = document.createElement('p');

  authorPara.style.margin = '4px';
  authorPara.textContent = 'Written by ' + card.book.author;

  pagesPara.style.margin = '4px';
  pagesPara.textContent = card.book.pages + ' pages long';
  
  modalBody.append(authorPara, pagesPara);

  return modalBody;
};

getModalFooter = (card) => {
  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer')
  modalFooter.style.borderTop = '1px solid #343a40'

  const editBtn = document.createElement('button');
  editBtn.classList.add('btn', 'btn-info');
  editBtn.textContent = 'Edit book';
  editBtn.addEventListener('click', () => editBook(card));

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('btn', 'btn-danger');
  removeBtn.textContent = 'Remove book';
  removeBtn.addEventListener('click', () => removeBook(card));

  modalFooter.append(editBtn, removeBtn);

  return modalFooter;
};

changeReadStatus = (card) => {

};

editBook = (card) => {
  const addBookForm = document.getElementById('add-book-btn');
  const closeBtn = document.getElementById('infoCloseBtn');
  closeBtn.click();
  showEditBookModal(card);
};

removeBook = (card) => {
  const infoModal = document.getElementById('bookInfoModal');
  let deleteBook = window.confirm('Are you sure?');
  if (deleteBook) {
    let libIndex = myLibrary.indexOf(card.book);
    let cardsIndex = bookCards.indexOf(card);
    if (libIndex > -1) myLibrary.splice(libIndex, 1);
    if (cardsIndex > -1) bookCards.splice(cardsIndex, 1);

    card.element.remove();
    infoModal.click();
  };
};


addBookToLibrary(new Book('A Song of Ice and Fire', 'George R. R. Martin', 413), myLibrary)
addBookToLibrary(new Book('The Hobbit', 'J. R. R. Tolkien', 354), myLibrary)
addBookToLibrary(new Book('Foundation', 'Isaac Asimov', 256), myLibrary)


listBooks(myLibrary)