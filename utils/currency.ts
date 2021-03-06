/** @format */

export const format = (value: number) => {
	// Crear formateador
	const formatter = new Intl.NumberFormat('en-US', {
		// FOrmateador internacional para monedas "new Intl"
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatter.format(value); //$2,500.00
};
