import React from "react";
import styles from "./postList.module.css";

export default function PostList({ children }: React.PropsWithChildren) {
	return <div className={styles.postList}>{children}</div>
}
