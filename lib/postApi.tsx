export interface PostData {
	id: number;
	title: string;
	dateMs: number;
	score: number;
}

const MOCK_POST_COUNT = 7;
const MS_IN_HOUR = 1000*60*60;
const MOCK_POSTS: PostData[] = Array.from({ length: MOCK_POST_COUNT }).map((_, index) => ({
	id: index,
	title: `Post number ${index}`,
	dateMs: Date.now() - index * MS_IN_HOUR,
	score: (index % 3)
}));

export default async function getPosts(): Promise<PostData[]> {
	return Promise.resolve(MOCK_POSTS);
}
