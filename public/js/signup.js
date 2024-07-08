async function signupFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('form').addEventListener('submit', signupFormHandler)