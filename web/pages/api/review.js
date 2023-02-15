// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { getReviews } from '../../../index';
import prisma from '../../prisma-client';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      return res.status(200).json({
        success: false,
        message: `Method ${req.method} is not supported on this route`
      });
    }

    let coffee_shop_name = req.body.coffee_shop_name;

    // PrismaClient DB
    let reviews = await prisma.review.findMany();
    await prisma.review.create({
      data: {
        title: req.body.title,
        review: req.body.review
      }
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
  }
}
