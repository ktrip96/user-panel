export function isValidEmail(email: string = ''): boolean {
	let re = /\S+@\S+\.\S+/
	return re.test(email)
}

export function isEmpty(field: string = ''): boolean {
	return field.replace(/\s/g, '') === ''
}
