const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.post.update({
		where: { id: 1 },
		data: {
			content: "Updated Post Content",
		},
	});

	const data = await prisma.post.findMany();
	console.log(data);
}

main();
