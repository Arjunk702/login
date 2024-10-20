const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/register', (req, res) => {
    const userData = req.body;
    let users = [];
    if (fs.existsSync('users.json')) {
        users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    }

    if (users.find(user => user.username === userData.username)) {
        res.status(400).send('Username already exists');
    } else {
        users.push(userData);
        fs.writeFileSync('users.json', JSON.stringify(users));
        res.redirect('/login.html');
    }
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let users = [];
    if (fs.existsSync('users.json')) {
        users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    }

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.redirect('/welcome.html');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Serve the registration page at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/welcome.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
