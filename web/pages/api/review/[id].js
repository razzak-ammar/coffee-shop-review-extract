import prisma from '@/prisma-client';

export default async function handler(req, res) {
  try {
    if (!req.method === 'PUT') {
      return res.status(200).json({
        success: false,
        message: `Method ${req.method} is not supported on this route`
      });
    }

    console.log('APPLE', req.query.id);
    console.log('APPLE', req.body.filter);
    // PrismaClient DB
    let review = await prisma.review.update({
      where: {
        id: Number(req.query.id)
      },
      data: {
        filtered: Boolean(req.body.filter)
      }
    });

    res.status(200).json(review);
  } catch (error) {
    console.log(error);
  }
}
