import Layout from "@/components/layout";
import SortablePostList from "@/components/sortablePostList";
import { getPosts, type PostData } from "@/lib/postApi";
import { GetStaticProps } from "next";

const Home = ({ posts }: { posts: PostData[] }) => (
	<Layout>
		<SortablePostList posts={posts} />
	</Layout>
);

export const getStaticProps: GetStaticProps = async () => ({
	props: {
		posts: await getPosts()
	}
});

export default Home;
