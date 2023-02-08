import { PostData } from "@/types/post";

export enum SortType {
	Top,
	New,
	Hot
}

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

export default sortPosts;
