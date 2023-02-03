const dateFormatter = Intl.DateTimeFormat(undefined, {
	dateStyle: "short",
	timeStyle: "short",
})

const DateComponent: React.FC<{
	dateMs: number;
}> = ({ dateMs }) => {
	const dateObj = new Date(dateMs);
	return <div>{dateFormatter.format(dateObj)}</div>
}

export default DateComponent;
