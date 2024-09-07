const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
		data: {
			name: "Alice",
			username: "alice",
			profile: "Profile",
			password: "password",
			posts: {
				create: [
					{ content: "Alice post content", },
					{ content: "Another post by Alice", },
				],
			},
		},
	});

	console.log("Done...");
}

main();