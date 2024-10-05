const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { auth } = require("../middlewares/auth");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/verify", auth, function(req, res) {
    const user = res.locals.user;
    res.json(user);
});

router.post("/register", async function (req, res) {
	const { name, username, profile, password } = req.body;
	if (!name || !username || !password) {
		return res
			.status(400)
			.json({ msg: "require name, username and password" });
	}

	const hash = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			name: name,
			username: username,
			profile: profile,
			password: hash,
		},
	});

	res.json(user);
});

router.post("/login", async function (req, res) {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ msg: "require username and password" });
	}

	const user = await prisma.user.findUnique({
		where: { username: username },
	});

	if (user) {
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(user, process.env.JWT_SECRET);
            res.json({ token, user });
		}
	} else {
		res.status(401).json({ msg: "username or password incorrect" });
	}
});

module.exports = { usersRouter: router };
