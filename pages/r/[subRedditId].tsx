import {
	getSubRedditIds,
	getSubReddit,
	getPostsBySubreddit,
	type SubReddit,
	type PostData,
} from "@/lib/postApi";
import SortablePostList from "@/components/sortablePostList";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout";

type Props = {
	posts: PostData[],
	subReddit: SubReddit,
}

type Params = {
	subRedditId: string,
}

const UserPage = ({ posts, subReddit }: Props) => (
	<Layout title={`SubReddit: ${subReddit.displayName}`}>
		<SortablePostList posts={posts} />
	</Layout>
);

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const paths = (await getSubRedditIds())
		.map((id) => ({
			params: {
				subRedditId: id
			}
		}))
	return {
		paths,
		fallback: "blocking",
	}
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	const subReddit = await getSubReddit(params!.subRedditId);
	if (subReddit === undefined) {
		return {
			notFound: true
		}
	} else {
		let posts = await getPostsBySubreddit(params!.subRedditId)
		return {
			props: {
				posts,
				subReddit,
			}
		}
	}
};

export default UserPage;
