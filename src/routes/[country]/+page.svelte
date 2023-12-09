<script lang="ts">
	import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
	import { goto, onNavigate } from '$app/navigation';

	export let data;
	$: country = data?.country;

	//For view transitions API. It works only on Chromium browsers.
	onNavigate((navigation) => {
		// This property has not been implemented in TypeScript yet.
		// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	/**
	 * Returns an array of languages with length X from the country object.
	 * By default we show (so return) only the first three languages.
	 */
	function getCountryLanguages(
		country: Country,
		maxReturnedLanguageCount: number = 3
	) {
		let languages: Array<string> = [];
		let i: number = 0;
		const countryLanguagesCount: number = Object.keys(country.languages).length;

		Object.keys(country.languages).forEach((language, index) => {
			if (i < maxReturnedLanguageCount && i < countryLanguagesCount) {
				languages.push(country.languages[language]);
			}
			i++;
		});
		return languages;
	}
</script>

<div class="flex flex-col xl:mx-0 xl:w-[60%] xl:max-w-[60%] mt-5 xl:mt-20 mx-5">
	<button
		class="p-2 bg-gray-300 rounded-lg border-2 border-gray-300 mb-4 hover:bg-gray-400 hover:border-gray-400 shadow-md shadow-gray-400 back-button"
		on:click={() => goto('/')}
	>
		<i class="fas fa-reply mr-1"></i>
		Back
	</button>
	<div class="h-full w-full flex flex-col md:flex-row">
		{#if country}
			<div class="w-full xl:w-[60%] gap-2">
				<div class="flex items-center mb-2 border rounded justify-between">
					<h1 class="text-4xl font-bold country-title">
						{country.name.common}
					</h1>
					<img
						class="max-h-[4rem] rounded-lg ml-2 shadow-md shadow-gray-600"
						src={country.flags.svg}
						alt={country.flags.alt}
						title={country.flags.alt}
					/>
				</div>
				<div class="ml-3 mt-4 gap-2 grid grid-cols-2">
					<div>
						<strong>Capital:</strong>
						{country.capital ?? 'No capital'}
						<i class="fas fa-city text-gray-700"> </i>
					</div>
					<div>
						<strong> Population: </strong>
						{country.population.toLocaleString()}
						<i class="fas fa-user text-gray-700"></i>
					</div>
					<div>
						<strong> Area: </strong>
						{country.area.toLocaleString()}
						m<sup>2</sup>
					</div>
					<div>
						<strong> Region: </strong>
						{country.region}
					</div>
					<div>
						<strong>
							{#if country.currencies === undefined || Object.keys(country.currencies).length == 1}
								Currency{:else}
								Currencies{/if}:
						</strong>
						{#if country.currencies === undefined}
							None
						{:else}
							<!-- If more than 3... say and x more.. -->
							{#each Object.keys(country.currencies) as currency}
								<!-- 'Currency' and separator comma if needed -->
								{country.currencies[currency]
									.name}{#if currency !== Object.keys(country.currencies)[Object.keys(country.currencies).length - 1]},&nbsp;
								{/if}
							{/each}
						{/if}
					</div>
					<div>
						<strong>
							{#if Object.keys(country.languages).length > 1}
								Languages{:else}
								Language{/if}:
						</strong>
						{#each getCountryLanguages(country) as language}
							<!-- 'Language' and separator comma if needed -->
							{language}{#if language !== getCountryLanguages(country)[getCountryLanguages(country).length - 1]},&nbsp;
							{/if}
						{/each}
						<!-- If more than 3... say and x more.. -->
						{#if Object.keys(country.languages).length > 3}and&nbsp;{Object.keys(
								country.languages
							).length - 3} more...{/if}
					</div>
				</div>
			</div>
			<div class="flex w-full xl:w-[40%]">
				<!-- Should use Maps Javascript API instead of iframe/embed API for more interactability -->
				<iframe
					title="map"
					class="mt-5 mx-5 w-full"
					src={`https://www.google.com/maps/embed/v1/place?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&q=${country.name.common}`}
				></iframe>
			</div>
		{/if}
	</div>
</div>

<style>
	.back-button {
		view-transition-name: gray-button;
	}
</style>
