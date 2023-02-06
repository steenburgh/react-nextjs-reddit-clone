import clsx from "clsx";
import Layout from "@/components/layout"
import Post from "@/components/post"
import {
	getComments,
	type Comment,
} from "@/lib/mockPostApi"
import { GetStaticPaths, GetStaticProps } from "next"
import utilStyles from "@/styles/utils.module.css";
import { PostData } from "@/types/post";
import { getPostById, getPostIds } from "@/lib/post";

type Props = {
	post: PostData,
	comments: Comment[]
}

type Params = {
	postId: string,
}

const PostPage = ({ post, comments }: Props) => (
	<Layout title={`Post: ${post.title}`}>
		<div className={clsx(

			utilStyles.flexContainer,
			utilStyles.flexCol,
			utilStyles.flexGapL
		)}>
			<Post {...post} />
		{/* TODO: Comment UI */}

			{comments.map(({ id, content, user, score }) => (
				<div key={id} className={clsx(
					utilStyles.cardLevel1,
					utilStyles.paddingL,
				)}>
					<small>User: {user.id}</small>
					<p>Score: {score}</p>
					<br />
					<p>{content}</p>
				</div>
			))}
		</div>

	</Layout>
);

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const paths = (await getPostIds()).map((id) => ({
		params: {
			postId: id.toString()
		}
	}));
	return {
		paths,
		fallback: "blocking",
	}
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	const postIdNumber: number = parseInt(params!.postId);
	if (postIdNumber === undefined) {
		return { notFound: true };
	}
	const post = await getPostById(postIdNumber);
	if (post === null) {
		return { notFound: true };
	} else {
		const comments = await getComments(post.id);
		return {
			props: {
				post,
				comments
			}
		}
	}
};

export default PostPage;
