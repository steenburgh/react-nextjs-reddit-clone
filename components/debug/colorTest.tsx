import clsx from "clsx";
import styles from "./colorTest.module.css";

const ColorTest: React.FC = () => (
	<div className={styles.paletteContainer}>
		<div className={clsx(styles.boxAccent, styles.colorBox)}>accent</div>
		<div className={clsx(styles.boxSuccess, styles.colorBox)}>success</div>
		<div className={clsx(styles.boxInfo, styles.colorBox)}>infoinfo</div>
		<div className={clsx(styles.boxWarning, styles.colorBox)}>warning</div>
		<div className={clsx(styles.boxDanger, styles.colorBox)}>danger</div>
	</div>
);

export default ColorTest;
