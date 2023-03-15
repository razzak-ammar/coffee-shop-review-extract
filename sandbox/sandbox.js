import fs from 'fs';
import { parse } from 'node-html-parser';
import { PrismaClient } from '@prisma/client';

const config = {
  coffeehouseId: 19,
  page_path: 'test-2.html'
};

const prisma = new PrismaClient();

const html = fs.readFileSync(`./${config.page_path}`, { encoding: 'utf-8' });
const root = parse(html);

function parseReviews() {
  const review_containers = root.querySelectorAll('.reviewSelector');
  let reviews = [];

  review_containers.forEach((block, i) => {
    const title = block.querySelector('.noQuotes').textContent;
    const text = block.querySelector('.entry').textContent;
    const parsed_text = text.trim().split('Show less')[0];

    reviews.push({
      title: title,
      text: parsed_text,
      coffeeHouseId: config.coffeehouseId
    });
  });

  return reviews;
}

async function insertReview() {
  const reviews = await parseReviews();

  await reviews.forEach(async (review) => {
    console.log(review);
    await prisma.review.create({
      data: {
        title: review.title.toString(),
        text: review.text.toString(),
        coffeeHouseId: review.coffeeHouseId
      }
    });
  });
}

insertReview()
  .then(() => {
    console.log('it worked');
  })
  .catch((err) => {
    console.log(err);
  });
