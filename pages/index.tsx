import Head from "next/head"
import styles from "@/styles/Home.module.css"
import SortablePostList from "@/components/sortablePostList";
import getPosts, { PostData } from "@/lib/postApi";
import { GetStaticProps } from "next";

interface Props {
	posts: PostData[]
}

const Home = ({ posts }: Props) => {
	return (
		<>
			<Head>
				<title>ItRedd</title>
				<meta name="description" content="A clone of that one site you can use to vote on posts" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<SortablePostList posts={posts} />
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => ({
	props: {
		posts: await getPosts()
	}
});

export default Home;
