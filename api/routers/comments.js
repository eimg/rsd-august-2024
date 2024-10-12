const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { auth } = require("../middlewares/auth");

router.post("/comments", auth, async function (req, res) {
	const { postId, content } = req.body;
	const userId = res.locals.user.id;

	const result = await prisma.comment.create({
		data: {
            content: content,
			postId: Number(postId),
			userId: Number(userId),
		},
	});

	res.json(result);
});

router.delete("/comments/:id", auth, async function(req, res) {
    const { id } = req.params;
    const result = await prisma.comment.delete({
        where: { id: Number(id) },
    });

    res.json(result);
});

module.exports = { commentsRouter: router };
