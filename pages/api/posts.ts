import prisma from '@/lib/db/prisma';
import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts, getPostsBySubredditSlug, getPostsByUserSlug } from '@/lib/db/post';
import { PostData } from '@/types/post';

// TODO: Edge runtime?
// export const config = {
// 	runtime: 'edge',
// 	// Colocate with PlanetScale
// 	// TODO: Better way to do this?
// 	regions: ["iad1"]
// };

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostData[]>,
) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const subredditSlug = req.query.r;
				const userSlug = req.query.u;
				const subredditValid = subredditSlug !== undefined && typeof subredditSlug === "string";
				const userValid = userSlug !== undefined && typeof userSlug === "string";

				if (subredditValid &&  !userValid) {
					res.status(200).json(
						await getPostsBySubredditSlug(subredditSlug)
					);
				} else if (userValid && !subredditValid) {
					res.status(200).json(
						await getPostsByUserSlug(userSlug)
					);
				} else if (!userValid && !subredditValid) {
					res.status(200).json(
						await getAllPosts()
					);
				} else {
					res.status(400);
				}
				return res.end();
			} catch (e) {
				console.error('Request error', e);
				return res.status(500).end();
			}
		default:
			res.setHeader('Allow', ['GET']);
			return res.status(405).end(`Method ${method} Not Allowed`);
	}
}
