const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	const todo = await prisma.todo.findMany();
	res.json(todo);
});

app.post("/", async (req, res) => {
	const { name } = req.body;
	if (!name) res.status(400).json({ msg: "name required" });

	const result = await prisma.todo.create({
		data: { name: name },
	});

	res.json(result);
});

app.put("/:id", async (req, res) => {
	const { id } = req.params;
	const item = await prisma.todo.findFirst({
		where: { id: Number(id) },
	});

	const result = await prisma.todo.update({
		where: { id: Number(id) },
		data: { done: !item.done },
	});

	res.json(result);
});

app.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const result = await prisma.todo.delete({
		where: { id: Number(id) },
	});

	res.json(result);
});

app.listen(8080, () => {
	console.log("Todo API at 8080");
});
