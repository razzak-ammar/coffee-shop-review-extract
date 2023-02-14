// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getReviews } from '../../../index'
import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(200).json({ success: false, message: `Method ${req.method} is not supported on this route` })
        }

        let url = req.body[0].url;
        console.log(url);
        let coffee_shop_name = req.body.coffee_shop_name;

        let reviews = await getReviews(url, coffee_shop_name);

        // PrismaClient DB
        prisma.review
        


        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
    }
}
