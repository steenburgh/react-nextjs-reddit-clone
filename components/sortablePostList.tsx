import type { PostData } from "@/lib/postApi";
import Post from "./post";
import PostList from "./postList";
import SortControls from "./sortControls";

const SortablePostList: React.FC<{
	posts: PostData[]
}> = ({ posts }) => {
	return (
		<>
			<SortControls />
			<PostList>
				{
					posts.map(({ id, ...props}) =>
						<Post
							key={id.toString()}
							{...props}
						/>
					)
				}
			</PostList>
		</>
	)
}


export default SortablePostList;
