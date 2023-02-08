import { PostCreateRequest, PostType } from "@/types/post";
import { useState } from "react";
import clsx from "clsx";
import styles from "./postCreationControls.module.css";
import utilStyles from "@/styles/utils.module.css";
import { useSWRConfig } from "swr";
import { allPostsMatcher } from "@/lib/swr/postKeyGenerator";

const PostCreationControls: React.FC<{
	subredditSlug?: string,
	onPostCreateSuccess?: () => Promise<void>,
}> = ({
	onPostCreateSuccess = async () => {},
	subredditSlug = "cats"
}) => {
	const { mutate } = useSWRConfig();
	const [loading, setLoading] = useState<boolean>(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	// TODO: Don't hardcode
	const userSlug = "catPerson";
	// TODO: Picker UI for subreddits + post type
	const type = PostType.Text;

	const createPost = async () => {
		setLoading(true);
		const createRequest: PostCreateRequest = {
			title,
			content,
			userSlug,
			subredditSlug,
			type,
		};

		try {
			await fetch("/api/post", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(createRequest),
			});
			await mutate(allPostsMatcher);
			setTitle("");
			setContent("");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={clsx(
			styles.container,
			utilStyles.cardLevel1,
		)}>
			<input
				disabled={loading}
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Pick a cool title!"
			/>
			<textarea
				disabled={loading}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Enter some text..."
			/>
			<p>Subreddit: /r/{subredditSlug}</p>
			<div>
				<button
					disabled={loading}
					onClick={createPost}>
					{loading ? "Loading..." : "Post"}
				</button>
			</div>
		</div>
	);
};

export default PostCreationControls;
