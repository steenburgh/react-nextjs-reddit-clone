const postFetchUrl = ({
	userSlug,
	subredditSlug
}: {
	userSlug?: string,
	subredditSlug?: string,
}): string => {
	if (userSlug !== undefined && subredditSlug !== undefined) {
		throw new Error("Error: Both user and subreddit provided. Cannot filter posts by both user and subreddit at the same time");
	}
	const searchParams = new URLSearchParams();
	userSlug && searchParams.set("u", userSlug);
	subredditSlug && searchParams.set("r", subredditSlug);

	return `/api/posts?${searchParams.toString()}`;
}

export default postFetchUrl;
