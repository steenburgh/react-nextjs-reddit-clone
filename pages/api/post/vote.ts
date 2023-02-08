import { requestHandler } from "@/lib/apiHelper";
import { downvotePost, upvotePost } from "@/lib/db/post";
import { VoteType } from "@/types/post";

const downvoteHandler = requestHandler({
	POST: async (req) => {
		const voteTypeParam = req.body?.voteType
		const voteTypeParamValid = typeof voteTypeParam === "string"
			&& Object.keys(VoteType).includes(voteTypeParam);
		const postIdParam = req.body?.postId;
		const postIdParamValid = typeof postIdParam === "number";

		if (!voteTypeParamValid || !postIdParamValid) {
			return { status: 400 };
		}

		const voteType: VoteType = (voteTypeParam as VoteType);
		const postId: number = postIdParam;
		switch (voteType) {
			case VoteType.Up:
				await upvotePost(postId);
				return;
			case VoteType.Down:
				await downvotePost(postId);
				return;
			case VoteType.None:
				// TODO: Not implemented, DB doesn't support this yet
				return { status: 400 };
		}
	}
})

export default downvoteHandler;
