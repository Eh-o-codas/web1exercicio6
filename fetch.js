export function fetchCountryInfo(countryCode) {
    // Return the fetch call as a promise
    return fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`)
        .then(response => response.json())
        .then(data => {
            if (data[1]) {
                const countryName = data[1][0].country.value;
                const population = data[1][0].value;
                const year = data[1][0].date;

                return {
                    name: countryName,
                    population: population,
                    year: year
                };
            } else {
                return null;
            }
        })
        .catch(error => {
            throw error;
        });
}
