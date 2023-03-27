import { isEmpty } from 'lodash';

export const required = ({ value, message }) => {
	if (typeof value === 'object') {
		if (isEmpty(value)) {
			return message ? message : 'Required field';
		}
	}
	// if (typeof value === 'number') {
	// 	return value === 0 || value ? undefined : message ? message : 'Required field';
	// }
	if (typeof value === 'boolean') {
		return undefined;
	}
	if (!value)
		return !isEmpty(value) ? undefined : message ? message : 'Required field';
};
