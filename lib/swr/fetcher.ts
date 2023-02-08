const fetcher = async <JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> => {
	const response = await fetch(input, init);
	return response.json();
}

export default fetcher;
