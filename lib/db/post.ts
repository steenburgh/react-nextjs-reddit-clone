import prisma from "@/lib/db/prisma";
import { PostType as DBPostType, Post as DBPost } from ".prisma/client";
import { Prisma } from '@prisma/client'
import { PostCreateRequest, PostData, PostType, Subreddit, User } from "@/types/post";

const APIPostType_ToDBPostType = {
	[PostType.Link]: DBPostType.LINK,
	[PostType.ImageLink]: DBPostType.IMAGE_LINK,
	[PostType.Text]: DBPostType.TEXT,
}

const DBPostType_ToAPIPostType = {
	[DBPostType.LINK]: PostType.Link,
	[DBPostType.IMAGE_LINK]: PostType.ImageLink,
	[DBPostType.TEXT]: PostType.Text,
};

const POST_SELECT = {
	id: true,
	createdDate: true,
	score: true,
	title: true,
	content: true,
	type: true,
	subreddit: {
		select: {
			slug: true,
		},
	},
	user: {
		select: {
			slug: true,
		},
	},
};

const fromDbPost = ({
	user,
	subreddit,
	type: dbType,
	createdDate,
	...rest
}: {
	user: { slug: string },
	subreddit: { slug: string },
	type: DBPostType,
	createdDate: Date,
	id: number,
	score: number,
	title: string,
	content: string,
}): PostData => ({
	subredditUrl: `/r/${subreddit.slug}`,
	userUrl: `/u/${user.slug}`,
	createdDateJSON: JSON.stringify(createdDate),
	type: DBPostType_ToAPIPostType[dbType],
	commentCount: Math.floor(Math.random()*12), // TODO:
	...rest,
});

export const getPostById = async (postId: number): Promise<PostData | null> => {
	const dbResult = await prisma.post.findFirst({
		where: {
			id: postId,
		},
		select: POST_SELECT,
	});

	return dbResult === null ? dbResult : fromDbPost(dbResult);
};

const _getPosts = async (where: Prisma.PostWhereInput | undefined): Promise<PostData[]> => {
	const dbPosts = await prisma.post.findMany({
		where: where,
		select: POST_SELECT,
	});

	const posts: PostData[] = dbPosts.map(fromDbPost)

	return posts;
};

// TODO: Limit
export const getAllPosts = async (): Promise<PostData[]> =>
	await _getPosts(undefined);

export const getPostsByUserSlug = async (userSlug: string): Promise<PostData[]> =>
	await _getPosts({
		user: {
			slug: userSlug,
		},
	});

export const getPostsBySubredditSlug = async (subredditSlug: string): Promise<PostData[]> =>
	await _getPosts({
		subreddit: {
			slug: subredditSlug,
		},
	});

export const getPostIds = async (): Promise<number[]> => {
	const results = await prisma.post.findMany({
		select: {
			id: true,
		},
	});

	return results.map((result) => result.id);
};

export const getSubRedditSlugs = async (): Promise<string[]> => {
	const dbSlugs = await prisma.subreddit.findMany({
		select: {
			slug: true,
		},
	})

	return dbSlugs.map((findManyResult) => findManyResult.slug);
};

export const getUserSlugs = async (): Promise<string[]> => {
	const dbSlugs = await prisma.user.findMany({
		select: {
			slug: true,
		},
	})

	return dbSlugs.map((findManyResult) => findManyResult.slug);
};

export const getSubredditBySlug = async (subredditSlug: string): Promise<Subreddit | null> =>
	await prisma.subreddit.findFirst({
		where: {
			slug: subredditSlug,
		},
		select: {
			name: true,
			slug: true,
		}
	});

export const getUserBySlug = async (userSlug: string): Promise<User | null> =>
	await prisma.user.findFirst({
		where: {
			slug: userSlug,
		},
		select: {
			name: true,
			slug: true,
		}
	});

export const createPost = async ({
	title,
	content,
	subredditSlug,
	type,
	userSlug
}: PostCreateRequest): Promise<void> => {
	await prisma.post.create({
		data: {
			content: content,
			subreddit: {
				connect: {
					slug: subredditSlug,
				},
			},
			user: {
				connect: {
					slug: userSlug,
				},
			},
			title: title,
			type: APIPostType_ToDBPostType[type],
		},
	})
};

