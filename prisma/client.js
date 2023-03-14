import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const review = new prisma.review.create({
    data: {
      review: 'great and amazing coffee',
      title: 'amazing coffee house'
    }
  });

  console.log(review);
  // ... you will write your Prisma Client queries here
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

reviews = await prisma.review.findMany({
  where: {
    Keyword: {
      none: {}
    },
    filtered: false
  },
  include: {
    coffeehouse: true,
    Keyword: true
  }
});
