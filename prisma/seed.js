const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const passwordHash = await bcrypt.hash('numvarn', 10)

    const users = [
        {
            username: 'admin',
            password: passwordHash,
            role: 'Admin',
        },
        {
            username: 'phisan',
            password: passwordHash,
            role: 'Staff',
        },
        {
            username: 'sirikanlaya',
            password: passwordHash,
            role: 'User',
        },
    ]

    for (const user of users) {
        const existingUser = await prisma.user.upsert({
            where: { username: user.username },
            update: {},
            create: user,
        })
        console.log(`Created user with username: ${existingUser.username} (${existingUser.role})`)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
