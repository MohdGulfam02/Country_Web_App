const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')

document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;

            //  Now select elements AFTER header is inserted
            const themeChanger = document.querySelector(".theme-changer");
            const themeIcon = document.querySelector(".theme-icon");
            const themeText = document.querySelector(".theme-text");

            if (!themeChanger || !themeIcon || !themeText) {
                console.error("Theme elements not found.");
                return;
            }

            //  Toggle dark mode
            themeChanger.addEventListener("click", function () {
                document.body.classList.toggle("dark");

                //  Correctly update localStorage
                if (document.body.classList.contains("dark")) {
                    localStorage.setItem("theme", "dark");
                    themeIcon.classList.replace("fa-moon", "fa-sun");
                    themeText.innerText = "Light Mode";
                } else {
                    localStorage.setItem("theme", "light");
                    themeIcon.classList.replace("fa-sun", "fa-moon");
                    themeText.innerText = "Dark Mode";
                }
            });

            //  Apply saved theme preference
            if (localStorage.getItem("theme") === "dark") {
                document.body.classList.add("dark");
                themeIcon.classList.replace("fa-moon", "fa-sun");
                themeIcon.classList.replace("fa-regular", "fa-solid");
                themeText.innerText = "Light Mode";
            } else {
                document.body.classList.remove("dark");
                themeIcon.classList.replace("fa-sun", "fa-moon");
                themeIcon.classList.replace("fa-solid", "fa-regular");
                themeText.innerText = "Dark Mode";
            }
        })
        .catch(error => console.error("Error loading the header:", error));
});

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        flagImage.src = country.flags.svg
        countryNameH1.innerText = country.name.common
        population.innerText = country.population.toLocaleString('en-IN')
        region.innerText = country.region
        topLevelDomain.innerText = country.tld.join(', ')

        if (country.capital) {
            capital.innerText = country.capital?.[0]
        }

        if (country.subregion) {
            subRegion.innerText = country.subregion
        }

        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        } else {
            nativeName.innerText = country.name.common
        }

        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(', ')
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }

        if (country.borders) {

            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        // console.log(borderCountry)
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag)
                    })
            })
        }
    })