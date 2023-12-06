/**
 * Loads the country list from the restcountries API and returns it for the data "prop".
 */
export async function load({ fetch }) {

    try {
        const response = await fetch(
            'https://restcountries.com/v3.1/all?fields=name'
        );
        const data: CountryApiResponse[] = await response.json();
        const countryNames: Array<string> = data
            .map((country: CountryApiResponse) => country.name.common)
            .sort();
 

        const countries: Array<CountryListElement> = countryNames.map((countryName: string) => {
            return {
                name: countryName,
                visited: false
            }
        });
        
        return {
            countries: countries
        }
        
    } catch (error: unknown) {
        console.log(error);
    }

	return { countryNames: [] };
}