<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import {
		allCountries,
		visibleCountries,
		countrySelectScroll,
		countrySelectExpanded,
		countrySelectSearch
	} from '../stores/countrySelectStores';

	let mounted = false;

	function onOverflownScroll(event: Event) {
		const target = event.target as HTMLDivElement;
		$countrySelectScroll = target.scrollTop;
	}

	/**
	 * Sets the scroll position of the country select element.
	 * This is used to restore the scroll position when the user navigates back to the country select page.
	 */
	function setScrollPosition() {
		if (!$countrySelectScroll) return;
		const countrySelect = document.querySelector(
			'#country-select'
		) as HTMLDivElement;
		countrySelect.scrollTop = $countrySelectScroll;
	}

	onMount(() => {
		setScrollPosition();
		mounted = true;
	});

	/**
	 * Sets the countryListElement.visited property to true and navigates to the country page
	 */
	function onCountrySelectClick(countryListElement: CountryListElement) {
		if (!$visibleCountries) return;
		countryListElement.visited = true;
		goto('/' + countryListElement.name);
	}

	async function onCountrySelectSearch(countrySelectSearch: string) {
		try {
			if (!countrySelectSearch) {
				$visibleCountries = $allCountries;
				return;
			}
			const response = await fetch(
				//Can add more than name to search by(?)
				'https://restcountries.com/v3.1/name/' +
					countrySelectSearch +
					'?fields=name'
			);
			//Parse to own LIB. Check if empty..
			const data: CountryApiResponse[] = await response.json();
			const countryNames: Array<string> = data
				.map((country: CountryApiResponse) => country.name.common)
				.sort();

			$visibleCountries = countryNames.map((countryName: string) => {
				return {
					name: countryName,
					visited: false
				};
			});
		} catch (error: unknown) {
			console.log(error);
		}
	}

	$: onCountrySelectSearch($countrySelectSearch);
</script>

<input
	class="inline-block w-full styled-input border-t-2 rounded-t"
	placeholder="Choose or search"
	disabled={!mounted}
	bind:value={$countrySelectSearch}
	on:click={() => ($countrySelectExpanded = true)}
/>
<div
	class="w-full bg-white shadow-md overflow-auto country-select-scrollbar max-h-full"
	on:scroll={onOverflownScroll}
	id="country-select"
>
	{#if $countrySelectExpanded && $visibleCountries}
		{#each $visibleCountries as countryListElement (countryListElement.name)}
			<button
				class="p-2 hover:bg-gray-100 cursor-pointer inline-block w-full text-left {countryListElement.visited &&
					'bg-gray-200'}"
				on:click={() => onCountrySelectClick(countryListElement)}
			>
				{countryListElement.name}
			</button>
		{/each}
	{/if}
</div>

<button
	class="w-full bg-gray-300 text-center cursor-pointer hover:bg-gray-400 shadow-md shadow-gray-400 rounded-b"
	on:click={() => ($countrySelectExpanded = !$countrySelectExpanded)}
>
	<i class="fas {$countrySelectExpanded ? 'fa-caret-up' : 'fa-caret-down'}"></i>
</button>

<style>
	.country-select-scrollbar::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	.country-select-scrollbar::-webkit-scrollbar-thumb {
		background: #888;
	}

	.country-select-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	.country-select-scrollbar::-webkit-scrollbar {
		width: 10px;
	}
</style>
