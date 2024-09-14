const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/posts", async function (req, res) {
	const data = await prisma.post.findMany({
		orderBy: { id: "desc" },
		take: 20,
		include: { user: true },
	});

	res.json(data);
});

router.get("/posts/:id", async function (req, res) {
	const { id } = req.params;
	const data = await prisma.post.findFirst({
		where: { id: Number(id) },
		include: { user: true },
	});

	res.json(data);
});

// curl -X POST localhost:8080/posts -d content="Some Content"
router.post("/posts", async function (req, res) {
	const { content } = req.body;
	if (!content) {
		return res.status(400).json({ msg: "content required" });
	}

	const post = await prisma.post.create({
		data: { content, userId: 1 },
        include: { user: true },
	});

	res.status(201).json(post);
});

// curl -X DELETE localhost:8080/posts/21
router.delete("/posts/:id", async function (req, res) {
	const { id } = req.params;

	try {
		await prisma.post.delete({
			where: { id: Number(id) },
		});

		res.sendStatus(204);
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = { postsRouter: router };
