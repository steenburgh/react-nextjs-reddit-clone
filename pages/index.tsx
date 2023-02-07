import Layout from "@/components/layout";
import PostListWidget from "@/components/postListWidget";
import SortablePostList from "@/components/postListWidget";
import { POSTS_API } from "@/lib/constants";
import { getAllPosts } from "@/lib/post";
import { PostData } from "@/types/post";

import { GetStaticProps } from "next";
import { SWRConfig } from "swr/_internal";

interface Props {
	fallback: {
		[POSTS_API]: PostData[]
	}
}

const Home = ({ fallback }: Props) => {
	return (
		<Layout>
			<SWRConfig value={{ fallback }}>
				<PostListWidget />
			</SWRConfig>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<Props> = async () => ({
	props: {
		fallback: {
			[POSTS_API]: (await getAllPosts()).slice(0, 3) // TODO: Undo
		}
	}
});

export default Home;
