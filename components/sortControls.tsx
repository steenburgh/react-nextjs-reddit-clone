import styles from "./sortControls.module.css";
import clsx from "clsx";

export enum SortType {
	Top,
	New,
	Hot
}

const SORTS = [
	{
		type: SortType.Top,
		displayName: "Top",
	},
	{
		type: SortType.New,
		displayName: "New",
	},
	{
		type: SortType.Hot,
		displayName: "Hot",
	}
];

const SortControls: React.FC<{
	sortType: SortType,
	onSortTypeChange: (newSortType: SortType) => void,
}> = ({
	sortType,
	onSortTypeChange
}) => {
	return (
		<div className={styles.sortOptions}>
			{SORTS.map(({ type, displayName }) =>
				<button
					className={clsx(
						styles.sortTypeButton,
						sortType === type && styles.highlight
					)}
					key={type}
					onClick={() => onSortTypeChange(type)}
				>
					{displayName}
				</button>
			)}
		</div>
	);
};

export default SortControls;
