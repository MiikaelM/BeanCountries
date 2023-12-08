/**
 * @param response The response from the restcountries API.
 * @returns The sorted country list.
 */
export async function parseCountriesFromResponse(
	response: Response
): Promise<CountryListElement[]> {
	const data: CountryApiResponse[] = await response.json();
	// Countries do not come ordered from the API, so we sort them alphabetically
	// It is quite inefficient to sort them here
	const countryNames: string[] = data
		.map((country: CountryApiResponse) => country.name.common)
		.sort();

	// Transform the array of country names into an array of CountryListElement
	return countryNames.map((countryName: string) => {
		return {
			name: countryName,
			visited: false
		};
	});
}
