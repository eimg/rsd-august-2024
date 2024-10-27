const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	// await prisma.post.delete({
	// 	where: { userId: 1 },
	// });

	await prisma.user.delete({
		where: { id: 1 },
	});

	const data = prisma.user.findMany();
	console.log(data);
}

main();
