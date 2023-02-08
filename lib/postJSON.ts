const postJSON = (url: string, serlializableValue: any) => fetch(
	url,
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(serlializableValue),
	}
);

export default postJSON;
