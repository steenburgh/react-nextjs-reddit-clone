import styles from "./voteButton.module.css";
import utilStyles from "@/styles/utils.module.css";
import clsx from "clsx";
import VoteEmpty from "./icons/voteEmpty";
import VoteSelected from "./icons/voteSelected";
import { VoteType } from "@/types/post";

const VoteButton: React.FC<{
	selected: boolean,
	type: VoteType.Up | VoteType.Down,
	onVote: (voteType: VoteType) => void,
}> = ({ selected, type, onVote }) => {
	// TODO: Hover states, colors
	const handleClick = () => {
		if (selected) {
			onVote(VoteType.None);
		} else {
			onVote(type);
		}
	};

	return (
		<button
			className={clsx(
				utilStyles.iconButton,
				styles.voteButton,
				type === VoteType.Down && utilStyles.flipH
			)}
			onClick={handleClick}
			title={type === VoteType.Up ? "Upvote button" : "Downvote button"}
		>
			{selected ? <VoteSelected /> : <VoteEmpty />}
		</button>
	)
}

export default VoteButton;
