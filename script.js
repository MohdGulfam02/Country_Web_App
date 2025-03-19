
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

const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
// const themeChanger = document.querySelector('.theme-changer')

let allCountriesData

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    })

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then(renderCountries)
})

function renderCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
            'en-IN'
        )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
        countriesContainer.append(countryCard)
    })
}


searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})

// themeChanger.addEventListener('click', () => {
//     document.body.classList.toggle('dark')
// })
