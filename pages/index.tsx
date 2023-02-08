import Layout from "@/components/layout";
import PostListWidget from "@/components/postListWidget";
import SortablePostList from "@/components/postListWidget";
import { POSTS_API } from "@/lib/constants";
import { getAllPosts } from "@/lib/db/post";
import postFetchUrl from "@/lib/swr/postFetchUrl";
import { PostData } from "@/types/post";

import { GetStaticProps } from "next";
import { unstable_serialize } from "swr";
import { SWRConfig } from "swr/_internal";

interface Props {
	fallback: {
		[key: string]: PostData[]
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
			[postFetchUrl({})]: await getAllPosts(),
		},
	},
});

export default Home;
