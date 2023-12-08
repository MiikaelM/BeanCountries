declare interface Country {
    name: {
        common: string,
        official: string
    },
    capital: string,
    region: string,
    population: number,
    area: number,
    currencies: {
        [key: string]: {
            name: string,
            symbol: string
        }
    },
    languages: {
        [key: string]: string
    },
    flags: {
        alt: string,
        svg: string
    }
}

declare interface CountryApiResponse {
    name: {
        common: string;
    };
};

declare interface CountryListElement {
    name: string,
    visited: boolean
};

type CountrySelectState = 'expanded' | 'collapsed';