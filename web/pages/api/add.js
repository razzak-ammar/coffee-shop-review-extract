import { getReviews } from '../../../index';
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
    console.log(parsed_request_body);

    let coffee_shop_name = parsed_request_body[0].coffee_shop_name;
    let url = parsed_request_body[0].url;

    console.log(coffee_shop_name, url);

    let reviews = await getReviews(url, coffee_shop_name);
    await console.log(reviews);

    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
  }
}
