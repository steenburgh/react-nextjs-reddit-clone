import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout";
import { PostData, Subreddit } from "@/types/post";
import { getPostsBySubredditSlug, getSubredditBySlug, getSubRedditSlugs } from "@/lib/post";
import PostListWidget from "@/components/postListWidget";
import { SWRConfig } from "swr";
import { POSTS_API } from "@/lib/constants";

type Props = {
	fallback: {
		[POSTS_API]: PostData[],
	};
	subreddit: Subreddit,
}

type Params = {
	subredditSlug: string,
}

const SubredditPage = ({ fallback, subreddit }: Props) => (
	<Layout title={`SubReddit: ${subreddit.name}`}>
		<SWRConfig value={{ fallback }}>
			<PostListWidget
				subredditSlug={subreddit.slug}
			/>
		</SWRConfig>
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
				fallback: {
					[POSTS_API]: posts,
				},
				subreddit,
			},
		};
	}
};

export default SubredditPage;
