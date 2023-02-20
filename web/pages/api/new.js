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

    let coffee_house_name = parsed_request_body[0].coffee_house_name;
    let url = parsed_request_body[0].url;

    console.log(coffee_shop_name, url);

    let new_coffeehouse = prisma.coffeeHouse.create({
      data: {
        name: coffee_house_name,
        url: url
      }
    });

    console.log(new_coffeehouse);

    return res.status(200).json(new_coffeehouse);
  } catch (error) {
    console.log(error);
  }
}
