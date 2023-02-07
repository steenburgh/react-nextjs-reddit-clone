let fail = true;

const fetcher = async <JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> => {
	await delay(3000); // TODO: Remove in prod
	// if (fail) {
	// 	fail = !fail;
	// 	throw Error("Debug: Intentionally failed");
	// }
	const response = await fetch(input, init);
	return response.json();
}

// Debug
const delay = (timeMs: number): Promise<void> => new Promise((resolve) => {
	setTimeout(resolve, timeMs);
});

export default fetcher;
