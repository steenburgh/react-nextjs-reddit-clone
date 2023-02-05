import styles from "./sortControls.module.css";
import utilStyles from "@/styles/utils.module.css";
import clsx from "clsx";
import { useState } from "react";

enum SortType {
	DATE,
	SCORE,
	HOT
}

const SORTS = [
	{
		type: SortType.DATE,
		displayName: "Date",
	},
	{
		type: SortType.SCORE,
		displayName: "Score",
	},
	{
		type: SortType.HOT,
		displayName: "Hot",
	}
];

const SortControls: React.FC = () => {
	const [sortType, setSortType] = useState<SortType>(SortType.SCORE);

	return (
		<div className={clsx(utilStyles.cardLevel1, styles.container)}>
			<div>Sort By</div>
			<div className={styles.sortOptions}>
				{SORTS.map(({ type, displayName }) =>
					<button
						className={clsx(
							styles.sortTypeButton,
							sortType === type && styles.highlight
						)}
						key={type}
						onClick={() => setSortType(type)}
					>
						{displayName}
					</button>
				)}
			</div>
		</div>
	);
};

export default SortControls;
