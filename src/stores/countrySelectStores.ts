import { writable, type Writable } from 'svelte/store';

export const countryList: Writable<Array<CountryListElement>|null> = writable(null);

export const countrySelectScroll: Writable<number> = writable(0);

export const countrySelectExpanded: Writable<boolean> = writable(false);