import { PostData } from "@/lib/postApi";
import DateComponent from "./date";
import VoteDisplay from "./voteDisplay";
import styles from "./post.module.css";
import utilStyles from "@/styles/utils.module.css";

const Post: React.FC<
	Omit<PostData, "id">
> = ({ title, dateMs, score }) => {
	return (
		<div className={styles.post}>
			<div className={utilStyles.flexNone}>
				<VoteDisplay score={score} />
			</div>
			<div className={utilStyles.flex1}>
				<h2>{title}</h2>
				<DateComponent dateMs={dateMs}/>
				<div>100 Comments</div>
			</div>
		</div>
	)
}

export default Post
