import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function quick() {
  const keywords = await prisma.keyword.findMany({
    select: {
      phrase: true
    },
    where: {
      review: {
        coffeehouse: {}
      }
    }
  });

  keywords.forEach((phrase) => {
    console.log(phrase.phrase);
  });
}

quick();
