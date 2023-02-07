import clsx from "clsx";
import fetcher from "@/lib/fetcher";
import { PostData } from "@/types/post";
import Post from "./post";
import PostList from "./postList";
import SortControls, { SortType } from "./sortControls";
import useSWR from "swr";
import { useMemo, useState } from "react";
import PostCreationControls from "./postCreationControls";
import utilStyles from "@/styles/utils.module.css";
import { POSTS_API } from "@/lib/constants";


const MS_IN_HOUR = 1000*60*60;
const getTimeMSFromPost = (post: PostData): number => {
	return new Date(JSON.parse(post.createdDateJSON)).getTime()
};
const comparators: Record<
	SortType,
	(postA: PostData, postB: PostData) => number
> = {
	[SortType.Hot]: (postA, postB) => {
		const newThreshold = Date.now() - 2*MS_IN_HOUR;
		const dateMsA = getTimeMSFromPost(postA);
		const dateMsB = getTimeMSFromPost(postB);
		const aIsNew = dateMsA >= newThreshold;
		const bIsNew = dateMsB >= newThreshold;
		if (aIsNew === bIsNew) {
			return postB.score - postA.score;
		} else {
			return bIsNew ? 1 : -1;
		}
	},
	[SortType.Top]: (postA, postB) => postB.score - postA.score,
	[SortType.New]: (postA, postB) => {
		const dateMsA = getTimeMSFromPost(postA);
		const dateMsB = getTimeMSFromPost(postB);
		return dateMsB - dateMsA;
	}
}

const sortPosts = (posts: PostData[], sortType: SortType): PostData[] =>
	posts.sort(comparators[sortType]);

const PostListWidget: React.FC<{
	subredditSlug?: string;
	userSlug?: string
}> = ({
	userSlug,
	subredditSlug,
}) => {
	const [sortType, setSortType] = useState<SortType>(SortType.Top);
	const {
		data: posts = [],
		error,
		isLoading,
		isValidating
	} = useSWR<PostData[]>(
		POSTS_API, // TODO: Move to shared SWR call
		fetcher
	);

	const sortedPosts = useMemo<PostData[]>(
		() => sortPosts(posts, sortType),
		[posts, sortType]
	);

	return (
		<div className={clsx(
			utilStyles.flexContainer,
			utilStyles.flexCol,
			utilStyles.flexGapL,
		)}>
			<small>
				{"Debug - SWR Status:"}
				{isLoading && " loading..."}
				{isValidating && " validating..."}
				{error && ` error: ${JSON.stringify(error)}`}
			</small>
			{
				userSlug === undefined &&
					<PostCreationControls
						subredditSlug={subredditSlug}
					/>
			}
			<SortControls
				sortType={sortType}
				onSortTypeChange={setSortType}
			/>
			<PostList>
				{
					sortedPosts.map((props) =>
						<Post
							key={props.id.toString()}
							{...props}
						/>
					)
				}
			</PostList>
		</div>
	)
}


export default PostListWidget;
