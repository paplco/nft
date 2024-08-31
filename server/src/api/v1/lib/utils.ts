import { VARS } from './VARS';

export const cleanLog = (header: string, values: any = {}, force = false): void => {
	if (VARS.LOGGING_ON || force) {
		let out = `.\n\n================= ${header}`;
		for (let key in values) {
			let stringOut = typeof values[key] == 'object' ? beautifyBody(values[key]) : values[key];
			out += `\n\n ${key}: ${stringOut}`;
		}
		out += `\n\n================= END ${header} \n.`;
		console.log(out);
	}
};

/*
generateCode
8 characters: 2.8 trillion possible strings (36^8), Birthday Paradox 1.7 million
9 characters: 101.5 quadrillion possible strings (36^9), BDP: 40 million
*/
export const generateCode = (length = 8): string => {
	const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let retVal = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		retVal += charset.charAt(randomIndex);
	}
	return retVal;
};

export const beautifyBody = (body: string | object): string => {
	if (typeof body == 'object') body = JSON.stringify(body);
	return body?.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\/g, '');
};
