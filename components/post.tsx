import { PostData, PostType } from "@/types/post";
import DateComponent from "./date";
import VoteDisplay from "./voteControls";
import styles from "./post.module.css";
import utilStyles from "@/styles/utils.module.css";
import clsx from "clsx";
import Link from "next/link";

const Post: React.FC<PostData> = ({
	id,
	createdDateJSON,
	score,
	subredditUrl,
	userUrl,
	commentCount,
	title,
	content,
	type,
}) => (
	<div className={clsx(styles.post, utilStyles.flexContainer, utilStyles.cardLevel1)}>
		<div className={utilStyles.flexNone}>
			<VoteDisplay
				postId={id}
				score={score}
			/>
		</div>
		<div className={utilStyles.flex1}>
			{ type === PostType.Text ?
				<h3>{title}</h3> :
				<a href={content}>
					<h3>{title}</h3>
				</a>
			}
			<div>
				<Link href={subredditUrl}>{subredditUrl}</Link>
			</div>
			<div>
				<Link href={userUrl}>{userUrl}</Link>
			</div>
			{
				type === PostType.Text && <div>{content}</div>
			}
			<DateComponent dateJSON={createdDateJSON}/>
			<div>
				<Link href={`/posts/${id}`}>{commentCount} Comments</Link>
			</div>
		</div>
	</div>
);

export default Post;
