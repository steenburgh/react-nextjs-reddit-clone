import React from "react";
import styles from "./postList.module.css";

const PostList: React.FC<{
	children: React.ReactNode
}> = ({ children }) => (
	<div className={styles.postList}>{children}</div>
);

export default PostList;
