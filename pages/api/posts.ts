import { getAllPosts, getPostsBySubredditSlug, getPostsByUserSlug } from '@/lib/db/post';
import { requestHandler } from '@/lib/apiHelper';

// TODO: Edge runtime?
// export const config = {
// 	runtime: 'edge',
// 	// Colocate with PlanetScale
// 	// TODO: Better way to do this?
// 	regions: ["iad1"]
// };

const postsHandler = requestHandler({
	GET: async (req) => {
		const subredditSlug = req.query.r;
		const userSlug = req.query.u;
		const subredditValid = typeof subredditSlug === "string";
		const userValid = typeof userSlug === "string";

		if (subredditValid &&  !userValid) {
			return {
				data: await getPostsBySubredditSlug(subredditSlug),
			};
		} else if (userValid && !subredditValid) {
			return {
				data: await getPostsByUserSlug(userSlug)
			};
		} else if (!userValid && !subredditValid) {
			return {
				data: await getAllPosts()
			};
		} else {
			return { status: 400 };
		}
	}
});

export default postsHandler;
