import React from "react"
import Head from "next/head"
import { Inter } from "@next/font/google";
import clsx from "clsx";
import utilStyles from "@/styles/utils.module.css";
import styles from "./layout.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const APP_NAME = "ItRedd";

const Layout: React.FC<{
	title?: String
	children: React.ReactNode
}> = ({
	title = APP_NAME,
	children
}) => (
	<>
		<Head>
			<title>{title === APP_NAME ? title : `${title} | ${APP_NAME}`}</title>
			<meta name="description" content="A clone of that one site you can use to vote on posts" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<header className={clsx(inter.className, utilStyles.flexContainer, utilStyles.flexAlignCenter)}>
			<Link href="/">
				<h1>ItRedd</h1>
			</Link>

			{title !== APP_NAME && <h2>{title}</h2>}
		</header>
		<main className={clsx(inter.className, styles.main)}>
			<div className={styles.content}>
				{children}
			</div>
		</main>
	</>
);

export default Layout;

