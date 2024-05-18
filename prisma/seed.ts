import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'John Doe',
        email: 'john@doe.com',
        cpf: '123.456.789-00',
        password: '12345678',
      },
      {
        fullName: 'Jane Doe',
        email: 'jane@doe.com',
        cpf: '987.654.321-00',
        password: '87654321',
      },
    ],
  });

  const users = await prisma.user.findMany();

  const equipments = await prisma.equipment.createMany({
    data: [
      {
        equipmentName: 'Equipamento Genérico 1',
        stock: 5,
        creatorId: users[0].id,
      },
      {
        equipmentName: 'Equipamento Genérico 2',
        stock: 3,
        creatorId: users[0].id,
      },
      {
        equipmentName: 'Equipamento Genérico 3',
        stock: 10,
        creatorId: users[1].id,
      },
      {
        equipmentName: 'Equipamento Genérico 4',
        stock: 15,
        creatorId: users[1].id,
      },
    ],
  });

  console.table(equipments);
  console.table(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
