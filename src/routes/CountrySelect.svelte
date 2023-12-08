<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import {
		allCountries,
		visibleCountries,
		countrySelectScroll,
		countrySelectState,
		countrySelectSearch
	} from '../stores/countrySelectStores';
	import { parseCountriesFromResponse } from '$lib/restCountriesResponseService';
	import { slide } from 'svelte/transition';
	import { expoIn, expoOut } from 'svelte/easing';

	let mounted = false;

	function onOverflownScroll(event: Event): void {
		const target = event.target as HTMLDivElement;
		$countrySelectScroll = target.scrollTop;
	}

	/**
	 * Sets the scroll position of the country select element.
	 * This is used to restore the scroll position when the user navigates back to the country select page.
	 */
	function setScrollPosition(): void {
		if (!$countrySelectScroll) return;
		const countrySelect = document.querySelector(
			'#country-select'
		) as HTMLDivElement;

		//Why can this be null? Server side things?
		if (!countrySelect) return;
		countrySelect.scrollTop = $countrySelectScroll;
	}

	onMount(() => {
		setScrollPosition();
		mounted = true;
	});

	/**
	 * Sets the countryListElement.visited property to true and navigates to the country page
	 */
	function onCountrySelectClick(countryListElement: CountryListElement): void {
		if (!$visibleCountries) return;
		countryListElement.visited = true;
		goto('/' + countryListElement.name);
	}

	async function onCountrySelectSearch(
		countrySelectSearch: string
	): Promise<void> {
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
			$visibleCountries = await parseCountriesFromResponse(response);
		} catch (error: unknown) {
			console.log(error);
		}
	}

	function toggleCountrySelectState(): void {
		$countrySelectState =
			$countrySelectState === 'collapsed' ? 'expanded' : 'collapsed';
	}

	$: onCountrySelectSearch($countrySelectSearch);
</script>

<input
	class="inline-block w-full styled-input border-t-2 rounded-t"
	placeholder="Choose or search"
	disabled={!mounted}
	bind:value={$countrySelectSearch}
	on:click={() => ($countrySelectState = 'expanded')}
/>
<div
	class="w-full bg-white shadow-md overflow-auto country-select-scrollbar max-h-full"
	on:scroll={onOverflownScroll}
	id="country-select"
>
	{#if $countrySelectState == 'expanded' && $visibleCountries}
		<!-- To return to old scroll position after expanding add on:introend={setScrollPosition} -->
		<div
			in:slide={{ duration: 300, easing: expoIn }}
			out:slide={{ duration: 300, easing: expoOut }}
		>
			{#each $visibleCountries as countryListElement (countryListElement.name)}
				<button
					class="p-2 hover:bg-gray-100 cursor-pointer inline-block w-full text-left {countryListElement.visited &&
						'bg-gray-200'}"
					on:click={() => onCountrySelectClick(countryListElement)}
				>
					{countryListElement.name}
				</button>
			{/each}
		</div>
	{/if}
</div>

<button
	class="w-full bg-gray-300 text-center cursor-pointer hover:bg-gray-400 shadow-md shadow-gray-400 rounded-b"
	on:click={toggleCountrySelectState}
>
	<i
		class="fas {$countrySelectState == 'expanded'
			? 'fa-caret-up'
			: 'fa-caret-down'}"
	></i>
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
