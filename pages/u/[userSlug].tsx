import PostListWidget from "@/components/postListWidget";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout";
import { getPostsByUserSlug, getUserBySlug, getUserSlugs } from "@/lib/db/post";
import { PostData, User } from "@/types/post";
import { POSTS_API } from "@/lib/constants";
import { SWRConfig } from "swr";
import { postKey } from "@/lib/swr/postKeyGenerator";

type Props = {
	fallback: {
		[key: string]: PostData[],
	};
	user: User,
}

type Params = {
	userSlug: string,
}

const UserPage = ({ fallback, user }: Props) => (
	<Layout title={`User: ${user.name}`}>
		<SWRConfig value={{ fallback }}>
			<PostListWidget
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
	const userSlug = params!.userSlug
	const user = await getUserBySlug(userSlug);
	if (user === null) {
		return {
			notFound: true
		}
	} else {
		const posts = await getPostsByUserSlug(userSlug)
		return {
			props: {
				fallback: {
					[postKey({ userSlug })]: posts,
				},
				user,
			}
		}
	}
};

export default UserPage;
