import type { PostData } from "@/lib/postApi";
import Post from "./post";
import PostList from "./postList";
import SortControls from "./sortControls";

const SortablePostList: React.FC<{
	posts: PostData[]
}> = ({ posts }) => {
	return (
		<>
			<small>Debug - Total Posts: {posts.length}</small>
			<SortControls />
			<PostList>
				{
					posts.map((props) =>
						<Post
							key={props.id.toString()}
							{...props}
						/>
					)
				}
			</PostList>
		</>
	)
}


export default SortablePostList;
