import prisma from '@/lib/db/prisma';
import { NextApiRequest, NextApiResponse } from "next";
import { createPost, getAllPosts } from '@/lib/db/post';
import { PostCreateRequest, PostData } from '@/types/post';

// TODO: Edge runtime?
// export const config = {
// 	runtime: 'edge',
// 	// Colocate with PlanetScale
// 	// TODO: Better way to do this?
// 	regions: ["iad1"]
// };

export default async function postHandler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = req;

	switch (method) {
		case 'POST':
			try {
				const data: PostCreateRequest = req.body;
				await createPost(data);
				return res.status(200).end();
			} catch (e) {
				console.error('Request error', e);
				return res.status(500).end();
			}
		default:
			res.setHeader('Allow', ['POST']);
			return res.status(405).end(`Method ${method} Not Allowed`);
	}
}
