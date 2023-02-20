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

    // keyword phrase
    // coffeehouse id

    let keywordPhrase = parsed_request_body.keywordPhrase;
    let reviewId = parsed_request_body.reviewId;

    let new_keyword = await prisma.keyword.create({
      data: {
        phrase: keywordPhrase,
        reviewId: Number(reviewId)
      }
    });

    console.log(new_keyword);

    return res.status(200).json(new_keyword);
  } catch (error) {
    console.log(error);
  }
}
