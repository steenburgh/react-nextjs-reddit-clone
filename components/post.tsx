import { PostData, PostType } from "@/types/post";
import DateComponent from "./date";
import VoteDisplay from "./voteDisplay";
import styles from "./post.module.css";
import utilStyles from "@/styles/utils.module.css";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

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
}) => {
	return (
		<div className={clsx(styles.post, utilStyles.flexContainer, utilStyles.cardLevel1)}>
			<div className={utilStyles.flexNone}>
				<VoteDisplay score={score} />
			</div>
			<div className={utilStyles.flex1}>
				{ type === PostType.Text ?
					<h3>{title}</h3> :
					<Link href={content}>
						<h3>{title}</h3>
					</Link>
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
};

export default Post
