export async function load({ params, fetch }) {
    try {
        const response = await fetch(
            'https://restcountries.com/v3.1/name/' + params.country
        );
        //Should we parse country.currencies and country.languages here?
        const [country]: Array<Country> = await response.json();
        return {
            country: country
        }
        
    } catch (error: unknown) {
        console.log(error);
    }

    return { country: null};
}