import styles from "./voteDisplay.module.css";

const VoteDisplay: React.FC<{
	score: number;
}> = ({score}) => {
	return (
		<div className={styles.voteDisplay}>
			<button>+++</button>
			{score.toString()}
			<button>---</button>
		</div>
	)
}

export default VoteDisplay;
