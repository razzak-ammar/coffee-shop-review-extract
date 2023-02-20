import prisma from '../../prisma-client';

export default async function handler(req, res) {
  try {
    if (!req.method === 'POST') {
      res.status(200).json({
        success: false,
        message: `Method ${req.method} is not supported on this route`
      });
    }

    let parsed_request_body = req.body;
    console.log('PARSED BODY');
    console.log(parsed_request_body);

    // Coffeehouse name
    // review title
    // review text

    let coffeehouse_id = parsed_request_body.coffeehouse_id;
    let review_title = parsed_request_body.review_title;
    let review_text = parsed_request_body.review_text;

    let new_review = await prisma.review.create({
      data: {
        coffeeHouseId: Number(coffeehouse_id),
        title: review_title,
        text: review_text
      }
    });

    console.log(new_review);

    return res.status(200).json(new_review);
  } catch (error) {
    console.log(error);
  }
}
