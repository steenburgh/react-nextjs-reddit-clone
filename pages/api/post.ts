import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts, type Post } from '@/lib/post';

// TODO: Edge runtime?
// export const config = {
// 	runtime: 'edge',
// 	// Colocate with PlanetScale
// 	// TODO: Better way to do this?
// 	regions: ["iad1"]
// };

export default async function assetHandler(
	req: NextApiRequest,
	res: NextApiResponse<Post[]>,
) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const posts: Post[] = await getAllPosts();
				return res.status(200).json(posts);
			} catch (e) {
				console.error('Request error', e);
				return res.status(500).end();
			}
		default:
			res.setHeader('Allow', ['GET']);
			return res.status(405).end(`Method ${method} Not Allowed`);
	}
}
