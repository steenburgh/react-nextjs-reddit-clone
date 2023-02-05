import { useState } from "react";
import VoteButton, { VoteType } from "./voteButton";
import styles from "./voteDisplay.module.css";

const VoteDisplay: React.FC<{
	score: number;
}> = ({score}) => {
	const [voteType, setVoteType] = useState<VoteType>(VoteType.NONE);

	return (
		<div className={styles.voteDisplay}>
			<VoteButton
				type={VoteType.UP}
				selected={voteType === VoteType.UP}
				onVote={setVoteType}
			/>
			<span>{score.toString()}</span>
			<VoteButton
				type={VoteType.DOWN}
				selected={voteType === VoteType.DOWN}
				onVote={setVoteType}
			/>
		</div>
	)
}

export default VoteDisplay;
