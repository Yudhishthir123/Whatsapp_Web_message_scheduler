const formatMessage = (message, meta = {}) => {
	const context = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
	return `${message}${context}`;
};

const logger = {
	info(message, meta) {
		console.info(`[INFO] ${formatMessage(message, meta)}`);
	},
	warn(message, meta) {
		console.warn(`[WARN] ${formatMessage(message, meta)}`);
	},
	error(message, meta) {
		console.error(`[ERROR] ${formatMessage(message, meta)}`);
	},
};

export { logger };
