const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

async function main() {
    const password = await bcrypt.hash("password", 10);

    console.log("User seeding started...")
    for(let i=0; i < 5; i++) {
        const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
        const username = `${firstName}${lastName[0]}`.toLowerCase();

        await prisma.user.upsert({
			where: { username },
			create: {
				name: `${firstName} ${lastName}`,
				username,
				profile: faker.person.bio(),
				password,
			},
			update: {},
		});
    }
	console.log("User seeding done.");

    console.log("Post seeding started...");
    for(let i=0; i<20; i++) {
        await prisma.post.create({
            data: {
                content: faker.lorem.paragraph(),
                userId: faker.number.int({ min: 1, max: 5 }),
            }
        })
    }
    console.log("Post seeding done.");
}

main();
