import Layout from "@/components/layout";
import SortablePostList from "@/components/sortablePostList";
import { getAllPosts } from "@/lib/post";
import { PostData } from "@/types/post";

import { GetStaticProps } from "next";

const Home = ({ posts }: { posts: PostData[] }) => (
	<Layout>
		<SortablePostList posts={posts} />
	</Layout>
);

export const getStaticProps: GetStaticProps = async () => ({
	props: {
		posts: await getAllPosts()
	}
});

export default Home;
