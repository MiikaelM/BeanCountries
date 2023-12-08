import { parseCountriesFromResponse } from '$lib/restCountriesResponseService';

/**
 * Loads the country list from the restcountries API and returns it for the data "prop".
 */
export async function load({ fetch }) {
	try {
		const response = await fetch(
			'https://restcountries.com/v3.1/all?fields=name'
		);
		const countries: Array<CountryListElement> =
			await parseCountriesFromResponse(response);
		return {
			countries: countries
		};
	} catch (error: unknown) {
		console.log(error);
	}

	return { countryNames: [] };
}
