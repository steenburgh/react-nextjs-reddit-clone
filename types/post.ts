export enum PostType {
	Link,
	ImageLink,
	Text,
}

export interface PostData {
	id: number;
	// NextJS won't stringify dates https://github.com/vercel/next.js/discussions/11498
	createdDateJSON: string;
	score: number;
	subredditUrl: string;
	userUrl: string;
	title: string;
	content: string;
	type: PostType;
	commentCount: number; // TODO:
}

export interface User {
	name: string;
	slug: string;
}

export interface Subreddit {
	name: string;
	slug: string;
}

export interface PostCreateRequest {
	subredditSlug: string;
	userSlug: string;
	title: string;
	content: string;
	type: PostType;
}

export enum VoteType {
	Up = "Up",
	Down = "Down",
	None = "None",
}
