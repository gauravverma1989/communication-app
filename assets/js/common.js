
var localStorageKey = 'users';

// confirmation box delete user

function deleteConfirmBox(userIndex) {
  let confirmDelete = confirm("Are you sure ?");
  if (confirmDelete) {
    let users = getFromLocalStorage();
    users.splice(userIndex, 1);
    updateLocalStorage(JSON.stringify(users))
    if (users.length === 0) {
      window.location.href = "index.html";
    }
    let user = getLoggedInUser();
    if (!user) {
      window.location.href = "index.html";
    }
    tableIteration();
  }
};


// register page

function store() {

  event.preventDefault()
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var pw = document.getElementById('password');
  var confPw = document.getElementById('confirmpassword');
  var regForm = document.getElementById('registerForm');
  var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (name.value.length == 0 && email.value.length == 0 && pw.value.length == 0 && confPw.value.length == 0) {
    alert('Please fill in all the fields');

  } else if (name.value.length == 0) {
    alert('Please fill in name');

  } else if (email.value.length == 0) {
    alert('Please fill in email');

  } else if (!email.value.match(mailFormat)) {
    alert('invalid email id')

  } else if (pw.value.length == 0) {
    alert('Please fill in password');

  } else if (confPw.value.length == 0) {
    alert('Please fill in confirm password');

  } else if (pw.value !== confPw.value) {
    alert('Passwords do not match');

  } else {
    var users = getFromLocalStorage();
    var checkForExistingUser = users.findIndex(function (user) {
      return user.email === email.value;
    })
    var message = '';
    var location = '';
    if (checkForExistingUser !== -1) {
      users[checkForExistingUser] = {
        ...users[checkForExistingUser],
        name: name.value
      };
      message = 'Your are already registered!';
      location = 'usermgt.html';
    } else {
      users.push({
        id: (users.length + 1),
        name: name.value,
        pw: pw.value,
        email: email.value,
      });
      message = 'Your account has been created';
      location = 'registration-success.html';
    }
    updateLocalStorage(JSON.stringify(users));
    alert(message);
    regForm.reset();
    window.location.href = location;
  }

}

// login page

function check() {

  event.preventDefault();

  var userEmail = document.getElementById('userEmail')
  var userPw = document.getElementById('userPw');
  var loginFm = document.getElementById('loginForm')
  var users = getFromLocalStorage();
  var findUser = users.find(function (user) {
    return user.email === userEmail.value && user.pw === userPw.value;
  });

  if (findUser) {
    localStorage.setItem('loggedInEmail', userEmail.value);
    alert('You are logged in.');
    loginFm.reset();
    window.location.href = "login-success.html";
  } else {
    alert('Error on login');
  }
}

// common functions


// getting users array from local storage
function getFromLocalStorage() {
  var users = localStorage.getItem(localStorageKey);
  if (users) {
    users = JSON.parse(users);
  } else {
    users = [];
  }
  return users;
}

//updating users in local storage
function updateLocalStorage(users) {
  return localStorage.setItem(localStorageKey, users);
}

// gettting logged in user
function getLoggedInUser() {
  var loginEmail = localStorage.getItem('loggedInEmail');
  let users = getFromLocalStorage();
  let user = users.find(user => user.email === loginEmail);
  return user;
}
