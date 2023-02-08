import prisma from '@/lib/db/prisma';
import { NextApiRequest, NextApiResponse } from "next";
import { createPost, getAllPosts } from '@/lib/db/post';
import { PostCreateRequest, PostData } from '@/types/post';
import { requestHandler } from '@/lib/apiHelper';

// TODO: Edge runtime?
// export const config = {
// 	runtime: 'edge',
// 	// Colocate with PlanetScale
// 	// TODO: Better way to do this?
// 	regions: ["iad1"]
// };

const postHandler = requestHandler({
	POST: async (req) => {
		const data: PostCreateRequest = req.body;
		await createPost(data);
	}
});

export default postHandler;
