var libraryCatalog = new Map([
    ["book1", "A Tale of Two Cities"],
    ["book2", "To Kill a Mockingbird"]
]);
libraryCatalog.set("book3", "1984"); // Add new entry
var title = libraryCatalog.get("book1"); // Retrieve value
console.log(title); // Output: "A Tale of Two Cities"
