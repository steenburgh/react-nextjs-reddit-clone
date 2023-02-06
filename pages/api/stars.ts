import prisma from '@/lib/prisma';
import type { Star } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

// TODO: Edge runtime?
// export const config = {
// 	runtime: 'edge',
// 	// Colocate with PlanetScale
// 	// TODO: Better way to do this?
// 	regions: ["iad1"]
// };

interface ErrorResponse {
	error: string;
}

export default async function assetHandler(
	req: NextApiRequest,
	res: NextApiResponse<Star[] | ErrorResponse>,
) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const stars = await prisma.star.findMany();
				return res.status(200).json(stars);
			} catch (e) {
				console.error('Request error', e);
				return res.status(500).json({ error: 'Error fetching posts' });
			}
		default:
			res.setHeader('Allow', ['GET']);
			return res.status(405).end(`Method ${method} Not Allowed`);
	}
}
