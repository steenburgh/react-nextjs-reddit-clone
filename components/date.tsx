const dateFormatter = Intl.DateTimeFormat(undefined, {
	dateStyle: "short",
	timeStyle: "short",
})

const DateComponent: React.FC<{
	dateJSON: string;
}> = ({ dateJSON }) => {
	const dateObj: Date = new Date(JSON.parse(dateJSON));
	return (
		/* TODO: Is this really the best way to fix the "Text content did not match" warning?
			Needs further investigation to verify, but...

			* React does call it out as a potential use case:
			https://reactjs.org/docs/dom-elements.html#suppresshydrationwarning

			* It's likely that this is necessary because our date formatter uses the browser
			locale, which could differ from the server
		 */
		<small suppressHydrationWarning>{dateFormatter.format(dateObj)}</small>
	)
}

export default DateComponent;
