
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let valid = true;

    if (!nameRegex.test(name)) {
        valid = false;
        document.getElementById('nameError').innerText = 'Invalid name (at least 2 letters)';
    } else {
        document.getElementById('nameError').innerText = '';
    }

    if (!emailRegex.test(email)) {
        valid = false;
        document.getElementById('emailError').innerText = 'Invalid email format';
    } else {
        document.getElementById('emailError').innerText = '';
    }

    if (!passwordRegex.test(password)) {
        valid = false;
        document.getElementById('passwordError').innerText = 'Password must be at least 8 characters long and contain both letters and numbers';
    } else {
        document.getElementById('passwordError').innerText = '';
    }

    if (password !== confirmPassword) {
        valid = false;
        document.getElementById('confirmPasswordError').innerText = 'Passwords do not match';
    } else {
        document.getElementById('confirmPasswordError').innerText = '';
    }

    if (valid) {
        alert('Registration successful!');
        
    }
});