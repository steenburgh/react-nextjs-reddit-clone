import clsx from "clsx";
import { PostData } from "@/types/post";
import Post from "./post";
import PostList from "./postList";
import SortControls from "./sortControls";
import useSWR from "swr";
import { useMemo, useState } from "react";
import PostCreationControls from "./postCreationControls";
import utilStyles from "@/styles/utils.module.css";
import sortPosts, { SortType } from "@/lib/postSorter";
import fetcher from "@/lib/swr/fetcher";
import postFetchUrl from "@/lib/swr/postFetchUrl";

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
		postFetchUrl({ userSlug, subredditSlug }),
		fetcher,
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
