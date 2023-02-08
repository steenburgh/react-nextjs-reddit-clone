import postJSON from "@/lib/postJSON";
import { allPostsMatcher } from "@/lib/swr/postKeyGenerator";
import { PostData, VoteType } from "@/types/post";
import { useState } from "react";
import { useSWRConfig } from "swr";
import VoteButton from "./voteButton";
import styles from "./voteControls.module.css";

const VoteControls: React.FC<{
	score: number;
	postId: number;
}> = ({
	score,
	postId
}) => {
	const { mutate } = useSWRConfig();
	const [voteType, setVoteType] = useState<VoteType>(VoteType.None);

	const changeVote = async (curVoteType: VoteType, newVoteType: VoteType) => {
		// TODO: Implement proper voting on the backend and remove this hack
		let scoreChange = 0;
		if (curVoteType === newVoteType) {
			scoreChange = 0;
		} if (curVoteType === VoteType.None) {
			scoreChange = newVoteType === VoteType.Up ? 1 : -1;
		} else if (curVoteType === VoteType.Down) {
			scoreChange = newVoteType === VoteType.Up ? 2 : 1;
		} else if (curVoteType === VoteType.Up) {
			scoreChange = newVoteType === VoteType.Down ? -2 : -1;
		}

		if (scoreChange === 0) {
			return;
		}
		try {
			console.log(scoreChange);
			mutate(allPostsMatcher, (data: PostData[] = []) => {
				const newData = data.slice();
				const index = data.findIndex(({ id }) => id === postId);
				newData[index] = {
					...newData[index],
					score: score + scoreChange,
				}
				return newData;
			}, { revalidate: false });

			for (let i = 0; i < Math.abs(scoreChange); i++) {
				await postJSON("/api/post/vote", {
					postId,
					voteType: scoreChange > 0 ? VoteType.Up : VoteType.Down,
				});
			}

		} catch (e) {
			// It's not critical that post votes are counted
			console.warn("Failed to submit vote");
		} finally {
			mutate(allPostsMatcher);
		}
	};

	const handleVote = (newVoteType: VoteType) => {
		changeVote(voteType, newVoteType);
		setVoteType(newVoteType);
	};

	return (
		<div className={styles.voteDisplay}>
			<VoteButton
				type={VoteType.Up}
				selected={voteType === VoteType.Up}
				onVote={handleVote}
			/>
			<span>{score.toString()}</span>
			<VoteButton
				type={VoteType.Down}
				selected={voteType === VoteType.Down}
				onVote={handleVote}
			/>
		</div>
	)
}

export default VoteControls;
