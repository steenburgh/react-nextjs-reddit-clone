import SortablePostList from "@/components/sortablePostList";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout";
import { getPostsByUserSlug, getUserBySlug, getUserSlugs } from "@/lib/post";
import { PostData, User } from "@/types/post";

type Props = {
	posts: PostData[],
	user: User,
}

type Params = {
	userSlug: string,
}

const UserPage = ({ posts, user }: Props) => (
	<Layout title={`User: ${user.name}`}>
		<SortablePostList posts={posts} />
	</Layout>
);

// TODO: Share code with subreddit + maybe post?
export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const paths = (await getUserSlugs())
		.map((slug) => ({
			params: {
				userSlug: slug
			}
		}))
	return {
		paths,
		fallback: "blocking",
	}
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	const user = await getUserBySlug(params!.userSlug);
	if (user === null) {
		return {
			notFound: true
		}
	} else {
		const posts = await getPostsByUserSlug(params!.userSlug)
		return {
			props: {
				posts,
				user,
			}
		}
	}
};

export default UserPage;
