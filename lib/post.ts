import prisma from "@/lib/prisma";
import { PostType as DBPostType } from ".prisma/client";
import { PostData, PostType } from "@/types/post";


const DBPostType_ToPostType = {
	[DBPostType.LINK]: PostType.Link,
	[DBPostType.IMAGE_LINK]: PostType.ImageLink,
	[DBPostType.TEXT]: PostType.Text,
};

// TODO: Limit
export const getAllPosts = async (): Promise<PostData[]> => {
	const postsFromDB = await prisma.post.findMany({
		select: {
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
				}
			}
		}
	});

	const posts: PostData[] = postsFromDB.map(({
		user,
		subreddit,
		type: dbType,
		createdDate,
		...rest
	}) => ({
		subredditUrl: `/r/${subreddit.slug}`,
		userUrl: `/u/${user.slug}`,
		createdDateJSON: JSON.stringify(createdDate),
		type: DBPostType_ToPostType[dbType],
		commentCount: Math.floor(Math.random()*12), // TODO:
		...rest,
	}))

	return posts;
};
