const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const users = [];

function isStrongPassword(password) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongPasswordRegex.test(password);
}

router.get('/', (req, res) => {
    res.json({ users });
});

router.post('/signup', (req, res) => {
    const { name, email, password, photoUrl } = req.body;

    if (!name || !email || !password || !photoUrl) {
        return res.status(400).json({ message: 'Бүх талбарыг бөглөнө үү' });
    }

    if (!isStrongPassword(password)) {
        return res.status(400).json({
        message: 'Нууц үг дор хаяж 8 тэмдэгт, том, жижиг үсэг, тоо, болон тусгай тэмдэгт агуулсан байх ёстой.'
        });
    }

    const emailExists = users.find(u => u.email === email);
    if (emailExists) {
        return res.status(400).json({ message: 'Бүртгэлтэй имэйл байна' });
    }

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password,
        photoUrl
    };

    users.push(newUser);
    res.status(201).json({ user: newUser });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Бүртгэлгүй хэрэглэгч байна' });
    }

    res.json({ user });
});

module.exports = router;
