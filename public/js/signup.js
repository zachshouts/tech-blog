const signupForm = document.getElementById('signup-form');
const signupUsername = document.getElementById('signup-username');
const signupPassword = document.getElementById('signup-password');
const signupStatus = document.getElementById('signup-status');


async function signup(e) {
    e.preventDefault();
    e.stopPropagation();

    const username = signupUsername.value;
    const password = signupPassword.value;

    if (password.length >= 8) {
        const userObj = {
            username: username,
            password: password
        };

        const response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        });

        if (response.status === 200) {
            signupStatus.textContent = 'User created';
            document.location.replace('/');
        } else {
            signupStatus.textContent = 'Could not create user';
        };
    } else {
        signupStatus.textContent = 'Password must be at least 8 characters!';
    };
};

signupForm.addEventListener('submit', signup);