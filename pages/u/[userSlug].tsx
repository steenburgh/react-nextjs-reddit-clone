import SortablePostList from "@/components/postListWidget";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout";
import { getPostsByUserSlug, getUserBySlug, getUserSlugs } from "@/lib/post";
import { PostData, User } from "@/types/post";
import { POSTS_API } from "@/lib/constants";
import { SWRConfig } from "swr";

type Props = {
	fallback: {
		[POSTS_API]: PostData[],
	};
	user: User,
}

type Params = {
	userSlug: string,
}

const UserPage = ({ fallback, user }: Props) => (
	<Layout title={`User: ${user.name}`}>
		<SWRConfig value={{ fallback }}>
			<SortablePostList
				userSlug={user.slug}
			/>
		</SWRConfig>
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
				fallback: {
					[POSTS_API]: posts,
				},
				user,
			}
		}
	}
};

export default UserPage;
