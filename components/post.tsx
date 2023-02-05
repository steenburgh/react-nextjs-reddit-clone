import { PostData } from "@/lib/postApi";
import DateComponent from "./date";
import VoteDisplay from "./voteDisplay";
import styles from "./post.module.css";
import utilStyles from "@/styles/utils.module.css";
import clsx from "clsx";
import Link from "next/link";

const Post: React.FC<PostData> = ({
	id,
	title,
	dateMs,
	score,
	user,
	subReddit,
	commentCount,
}) => {
	const subRedditPath = `/r/${subReddit.id}`;
	const userPath = `/u/${user.id}`
	return (
		<div className={clsx(styles.post, utilStyles.flexContainer, utilStyles.cardLevel1)}>
			<div className={utilStyles.flexNone}>
				<VoteDisplay score={score} />
			</div>
			<div className={utilStyles.flex1}>
				<h3>{title}</h3>
				<div>
					<Link href={subRedditPath}>{subRedditPath}</Link>
				</div>
				<div>
					<Link href={userPath}>{userPath}</Link>
				</div>
				<div>{}</div>
				<DateComponent dateMs={dateMs}/>
				<div>
					<Link href={`/posts/${id}`}>{commentCount} Comments</Link>
				</div>
			</div>
		</div>
	);
};

export default Post
