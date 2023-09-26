let books = [];
const tableBody = document.querySelector("#bookTable tbody");
const editForm = document.getElementById("editForm");
const addForm = document.getElementById("addForm");
let editRowIndex = null;

const storedData = localStorage.getItem('booksData');
if (storedData) {
    books = JSON.parse(storedData);
} else {   books = [
    { name: " Book 1", author: " Author 1", price: "$10.99" },
    { name: " Book 2", author: " Author 2", price: "$12.99" },
];

saveToLocalStorage();
}


function saveToLocalStorage() {
    localStorage.setItem('booksData', JSON.stringify(books));
}


function fillTable() {
    tableBody.innerHTML = '';

    books.forEach((book, index) => {

        const row = tableBody.insertRow();
        const name = row.insertCell(0);
        const author = row.insertCell(1);
        const price = row.insertCell(2);
        const EditButtonCell = row.insertCell(3)
        const deleteButtonCell = row.insertCell(4)

        name.textContent = book.name;
        author.textContent = book.author
        price.textContent = book.price
        //Edit Button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit"
        editButton.setAttribute("class", "btn btn-warning");
        EditButtonCell.appendChild(editButton);
        //Delete button
        const delButton = document.createElement("button");
        delButton.textContent = "Delete"
        delButton.setAttribute("class", "btn btn-danger");
        deleteButtonCell.appendChild(delButton);

        delButton.addEventListener("click", () => {
            const confirmDelete = confirm(`Are you sure you want to delete ${book.name}?`);
            if (confirmDelete) {
                books.splice(index, 1);
                tableBody.deleteRow(index);
                saveToLocalStorage();

            }
        });
        editButton.addEventListener("click", () => {
            editRowIndex = index;
            editForm.style.display = "block";
            document.getElementById("editName").value = book.name;
            document.getElementById("editAuthor").value = book.author;
            document.getElementById("editPrice").value = book.price;

        });

    });
}
fillTable();

// updating field in the table
document.getElementById("updateButton").addEventListener("click", (e) => {
    e.preventDefault();
    if (editRowIndex !== null) {
        const editedName = document.getElementById("editName").value;
        const editedAuthor = document.getElementById("editAuthor").value;
        const editedPrice = document.getElementById("editPrice").value;

        books[editRowIndex].name = editedName;
        books[editRowIndex].author = editedAuthor;
        books[editRowIndex].price = editedPrice;
        const row = tableBody.rows[editRowIndex];
        row.cells[0].textContent = editedName;
        row.cells[1].textContent = editedAuthor;
        row.cells[2].textContent = editedPrice;
        saveToLocalStorage();

        editForm.style.display = "none";
        editRowIndex = null;
    }
});

//add book to the table 
document.getElementById("addButton").addEventListener("click", () => {
    addForm.style.display = "block";
    document.getElementById("addName").value = '';
    document.getElementById("addAuthor").value = '';
    document.getElementById("addPrice").value = '';

});

document.getElementById("addBookButton").addEventListener("click", (e) => {
    e.preventDefault();
    const newName = document.getElementById("addName").value;
    const newAuthor = document.getElementById("addAuthor").value;
    const newPrice = document.getElementById("addPrice").value;
    books.push({ name: newName, author: newAuthor, price: newPrice });
    saveToLocalStorage();
    fillTable();
    addForm.style.display = "none";
})
document.getElementById("cancelAddButton").addEventListener("click", () => {
    addForm.style.display = "none";
});

