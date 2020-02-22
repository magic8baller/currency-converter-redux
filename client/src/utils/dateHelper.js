export const formatISODate = (dateInput) => {
	let localDate = new Date(dateInput);
	let utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000))
	return utcDate.toISOString().split('T')[0];
}