const express = require("express");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/posts", async function(req, res) {
    const data = await prisma.post.findMany({
        include: { user: true }
    });

    res.json(data);
});

app.get("/posts/:id", async function(req, res) {
    const { id } = req.params;
    const data = await prisma.post.findFirst({
        where: { id: Number(id) },
        include: { user: true, }
    });

    res.json(data);
});

app.listen(8080, () => {
    console.log("API running at 8080...");
});
