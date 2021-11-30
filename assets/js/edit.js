
var queryParams = new URLSearchParams(window.location.search);
console.log(queryParams);
let users = getFromLocalStorage();
let userId = queryParams.get('userId');
if (!userId) {
    alert('User not found');
    window.location.href = "usermgt.html";
}
let user = users.find(user => user.id === Number(userId));
if (!user) {
    alert('User not found');
    window.location.href = "usermgt.html";
}

document.getElementById("fullName").value = user.name;

document.getElementById("email").value = user.email;

function updateInfo() {
    event.preventDefault();
    var changedFullName = document.getElementById("fullName").value
    var changedEmail = document.getElementById("email").value
    let userIndex = users.findIndex(user => user.id === Number(userId));
    users[userIndex] = {
        ...users[userIndex],
        name: changedFullName,
        email: changedEmail
    }
    let loggedInUser = getLoggedInUser();
    if (users[userIndex].id === loggedInUser.id) {
        let loggedInUserIndex = users.findIndex(item => item.id === loggedInUser.id);
        users[loggedInUserIndex] = {
            ...users[loggedInUserIndex],
            email: changedEmail
        }
        localStorage.setItem('loggedInEmail', changedEmail);
    }
    updateLocalStorage(JSON.stringify(users));
    window.location.href = "usermgt.html";
}