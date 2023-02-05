import styles from "./voteButton.module.css";
import utilStyles from "@/styles/utils.module.css";
import clsx from "clsx";
import VoteEmpty from "./icons/voteEmpty";
import VoteSelected from "./icons/voteSelected";

export enum VoteType {
	UP,
	DOWN,
	NONE,
}

const VoteButton: React.FC<{
	selected: boolean,
	type: VoteType.UP | VoteType.DOWN,
	onVote: (voteType: VoteType) => void,
}> = ({ selected, type, onVote }) => {
	// TODO: Hover states, colors
	const handleClick = () => {
		if (selected) {
			onVote(VoteType.NONE);
		} else {
			onVote(type);
		}
	};

	return (
		<button
			className={clsx(
				styles.iconButton,
				styles.voteButon,
				type === VoteType.DOWN && utilStyles.flipH
			)}
			onClick={handleClick}
			title={type === VoteType.UP ? "Upvote button" : "Downvote button"}
		>
			{selected ? <VoteSelected /> : <VoteEmpty />}
		</button>
	)
}

export default VoteButton;
