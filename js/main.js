// Listen for form submit (add bookmark).
document.getElementById('bookmarkSubmitForm').addEventListener('submit', saveBookmark);

// Save Bookmark.
function saveBookmark(e) {
    // Get form values.
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    // Create object that will be submitted to local storage.
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // If array doesn't exist initialize it, if it does just add another bookmark to it
    if (localStorage.getItem('bookmarks') === null) {
        // Init array.
        var bookmarks = [];
        // Add the new item to array.
        bookmarks.push(bookmark);
        // Set to local storage.
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Now add the new bookmark to array.
        bookmarks.push(bookmark);
        // Re-set to local storage.
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form.
    document.getElementById('bookmarkSubmitForm').reset();
    
    // Reload all bookmarks in storedBookmarks div.
    fetchBookmarks();
    
    // Prevent form from submitting.
    e.preventDefault();
}

// Delete bookmark.
function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.forEach(bookmark => {
        if (bookmark.url == url) {
            //console.log(bookmarks.indexOf(bookmark));
            bookmarks.splice(bookmarks.indexOf(bookmark), 1);
        }
    });
    
    // Re-set to local storage.
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Reload all bookmarks in storedBookmarks div.
    fetchBookmarks();

}

// Fetch previously stored bookmarks.
function fetchBookmarks() {
    
    //Get output div.
    var storedBookmarks = document.getElementById('storedBookmarks');
    if (storedBookmarks.innerHTML != null) {
        storedBookmarks.innerHTML = '';
    }

    //Build output for each bookmark.
    JSON.parse(localStorage.getItem('bookmarks')).forEach(bookmark => {
        storedBookmarks.innerHTML += '<div class="list-group-item">' + 
                                     '<h3>' + bookmark.name + 
                                     '<div style="float:right">' + 
                                     ' <a class="btn btn-info" target="_blank" href="' + bookmark.url +'">Visit</a> ' + 
                                     ' <a onclick="deleteBookmark(\'' + bookmark.url + '\')" class="btn btn-danger" href="">Delete</a> ' + 
                                     '</div>'
                                     '</h3>' + 
                                     '</div>';

    });
}

function validateForm(siteName, siteUrl) {

    // Check for empty fields.
    if (!siteName || !siteUrl) {
        alert('Please fill the form!');
        return false;
    }

    // Regex expression gotten from stackoverflow question. 
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    // Check site URL against the regular expression.
    if (!siteUrl.match(regex)) {
        alert('Please use valid URL!');
    }

    return true;
}