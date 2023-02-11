const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginStatus =  document.getElementById('login-status');

async function checkUser(e) {
    e.preventDefault();
    e.stopPropagation();

    const username = loginUsername.value;
    const password = loginPassword.value;

    const userObj = {
        username: username,
        password: password
    };

    const user = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    });

    if (user.status === 200) {
        loginStatus.textContent = 'Logged in';
        document.location.replace('/');
    } else {
        loginStatus.textContent = 'Invalid username or password';
    }
};

loginForm.addEventListener('submit', checkUser);