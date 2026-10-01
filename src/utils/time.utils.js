const parseDate = (value) => {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
};

const isFutureDate = (value, now = new Date()) => {
	const date = parseDate(value);
	return Boolean(date && date > now);
};

export { parseDate, isFutureDate };
