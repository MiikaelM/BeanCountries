# BeanCountries

Welcome to **BeanCountries**, a dynamic web application developed using SvelteKit. This project showcases the ability to retrieve and display data from an external API in a user-friendly interface. Using the REST Countries API (https://restcountries.com), BeanCountries allows users to explore various countries' details.

## Features

**BeanCountries** offers a range of features designed to provide an informative and engaging user experience for those interested in learning about different countries. Here are the key functionalities:

### Country Selection Dropdown:

- **Dynamic Country List**: Users can browse through a list of countries fetched from the REST Countries API.
- **Visited Countries Highlighting**: Countries that have already been visited are visually distinct in the dropdown.

### Searchable Input Field:

- This feature allows users to quickly search and select a country.

### Country Details Display:

- Upon selection, the application displays comprehensive information about the country, including its Name, Flag, Capital City, Population, Region, Currencies, and Languages.
- An embedded Google Map provides a geographical context for each selected country.

### Responsive Design:

- **BeanCountries** is built with a responsive design.

### Fun with Animations:

The application uses the View Transitions API for animating the dropdown and back buttons, adding a dynamic and modern feel to the user interface. Note that the View Transitions API currently only works on Chromium-based browsers.

### Deployment on Vercel:

BeanCountries is deployed on Vercel, making it easily accessible online. You can visit the application at `bean-countries.vercel.app/`.

## Technologies Used

- SvelteKit
- Rest Countries API (https://restcountries.com/)
- Tailwind CSS
- Typescript
- Google Maps API
- Vercel

## Setup and Installation

> Ensure you have Node.js installed on your machine.

```bash
git clone https://github.com/MiikaelM/BeanCountries.git
cd BeanCountries
cp .env.example .env
npm install
```

### Run the development server

```bash
npm run dev
```

Once the server is running, you can access the application at `http://localhost:3000`

## Learning Outcomes and Reflections

### Exploring TypeScript:

- This is my second project with TypeScript and I am definitely still familiarizing myself with it.
- I think I did not set up TS correctly/strict enough, as I noticed I had not set up types everywhere(?).
- I am not exactly sure if the types structure and naming conventions are correct.
- After a not so positive initial experience, working with TypeScript is usually actually not that bad. Anything that has to do with frameworks' or packages' internal types and objects is still usually quite inconvenient.
- I noticed that often when the functions have too complicated type structures, it means that they are pointlessly complicated and refactoring will make things simpler.
- I actually quite like the ease of creating types in TypeScript. For example using states is so much more convenient:

```ts
type CountrySelectState = 'expanded' | 'collapsed';
```

### Svelte/SvelteKit:

- I love it, it is such a pleasure to work with.
- I am not a very big fan of the folder routing system though.
- And coming from Laravel, a very mature (and opinionated) framework, the young-ish Svelte/Sveltekit is definitely different. Documentation is definitely not on the same level.

### View Transition API:

- Feels very easy to work with and the results are amazing
- Doesn't work with hidden overflown content :\(
- Only works on Chromium based browsers so far
  - I have heard that other browsers are working on support though

### Tailwind CSS:

- It's my second project with Tailwind as well and I find it VERY convenient
- I am still lacking in basic CSS understanding, some simple things took quite long to figure out
