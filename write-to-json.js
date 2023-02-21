import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function writeToJSON() {
  const reviews = await prisma.review.findMany({
    include: {
      coffeehouse: {
        select: {
          id: true,
          name: true
        }
      },
      Keyword: {
        select: {
          phrase: true,
          id: true
        }
      }
    }
  });

  await fs.writeFileSync(
    './reviews-data.json',
    JSON.stringify(reviews),
    'utf-8'
  );
}

writeToJSON();
