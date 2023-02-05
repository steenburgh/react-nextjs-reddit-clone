import {
	getUserIds,
	getUser,
	getPostsByUser,
	type User,
	type PostData,
} from "@/lib/postApi";
import SortablePostList from "@/components/sortablePostList";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout";

type Props = {
	posts: PostData[],
	user: User,
}

type Params = {
	userId: string,
}

const UserPage = ({ posts, user }: Props) => (
	<Layout title={`User: ${user.displayName}`}>
		<SortablePostList posts={posts} />
	</Layout>
);

// TODO: Share code with subreddit + maybe post?
export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const paths = (await getUserIds())
		.map((id) => ({
			params: {
				userId: id
			}
		}))
	return {
		paths,
		fallback: "blocking",
	}
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	const user = await getUser(params!.userId);
	if (user === undefined) {
		return {
			notFound: true
		}
	} else {
		const posts = await getPostsByUser(params!.userId)
		return {
			props: {
				posts,
				user,
			}
		}
	}
};

export default UserPage;
