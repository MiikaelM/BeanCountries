<script lang="ts">
	import '../assets/css/app.postcss';
	import '../assets/css/global.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { countryList } from '../stores/countrySelectStores';

	export let data;
	// Set countryList from props
	if (data && data.countryList) {
		$countryList = data?.countryList;
	}
</script>

<main class="flex flex-col h-100 w-full justify-center items-center">
	<slot />
</main>

<style>
</style>
