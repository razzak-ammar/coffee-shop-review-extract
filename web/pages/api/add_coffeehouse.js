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

    // Coffeehouse name
    // review title
    // review text

    let coffeeHouseName = parsed_request_body.coffeeHouseName;
    let coffeeHouseRegion = parsed_request_body.coffeeHouseRegion;
    let coffeeHouseUrl = parsed_request_body.coffeeHouseUrl;

    let new_coffeehouse = await prisma.coffeeHouse.create({
      data: {
        name: coffeeHouseName,
        url: coffeeHouseUrl,
        region: coffeeHouseRegion
      }
    });

    console.log(new_coffeehouse);

    return res.status(200).json(new_coffeehouse);
  } catch (error) {
    console.log(error);
  }
}
