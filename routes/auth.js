const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const login = require('../middleware/login');

router.get('/protected', login, (req, res) => {
	res.send('Hello Wolrd auth');
});

router.post('/signup', (req, res) => {
	const { name, email, password } = req.body;
	if (!email || !password || !name) {
		res.status(422).json({ error: 'Please add all the fills' });
	}

	User.findOne({ email }).then(savedUser => {
		if (savedUser) {
			return res.status(422).json({ error: 'User olready exist with that email' });
		}
		bcrypt.hash(password, 10).then(hashedPassword => {
			const user = new User({
				email,
				name,
				password: hashedPassword,
			});
			user
				.save()
				.then(user => {
					res.json({ msg: 'added successfully' });
				})
				.catch(err => {
					console.log(err);
				});
		});
	});
});

router.post('/signin', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(422).json({ error: 'Please add email or password' });
	}
	User.findOne({ email: email }).then(savedUser => {
		if (!savedUser) {
			return res.status(422).json({ error: 'Invalid email or password' });
		}
		bcrypt
			.compare(password, savedUser.password)
			.then(doMatch => {
				if (doMatch) {
					// res.json({ msg: 'Successfully signed in' });
					const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
					res.json({ token });
				} else {
					return res.status(422).json({ error: 'Invalid email or password' });
				}
			})
			.catch(err => {
				console.log(err);
			});
	});
});

module.exports = router;
