const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	await prisma.todo.createMany({
		data: [
			{ name: "Milk" },
			{ name: "Bread"},
			{ name: "Apple"},
			{ name: "Egg", done: true },
			{ name: "Butter", done: true },
		],
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
