import SortablePostList from "@/components/sortablePostList";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout";
import { PostData, Subreddit } from "@/types/post";
import { getPostsBySubredditSlug, getSubredditBySlug, getSubRedditSlugs } from "@/lib/post";

type Props = {
	posts: PostData[],
	subreddit: Subreddit,
}

type Params = {
	subredditSlug: string,
}

const SubredditPage = ({ posts, subreddit }: Props) => (
	<Layout title={`SubReddit: ${subreddit.name}`}>
		<SortablePostList posts={posts} />
	</Layout>
);

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const paths = (await getSubRedditSlugs())
		.map((slug) => ({
			params: {
				subredditSlug: slug
			}
		}))
	return {
		paths,
		fallback: "blocking",
	}
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	const subreddit = await getSubredditBySlug(params!.subredditSlug);
	if (subreddit === null) {
		return {
			notFound: true,
		};
	} else {
		let posts = await getPostsBySubredditSlug(params!.subredditSlug);
		return {
			props: {
				posts,
				subreddit,
			},
		};
	}
};

export default SubredditPage;
