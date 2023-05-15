//Get DOM elements
const rootHtml = document.getElementById("root"); // Get the root element where we'll add the episode cards
const searchInputHtml = document.getElementById("search-input");
const searchResultDisplayHtml = document.querySelector(".search-display");
const episodeSelectHTML = document.querySelector("#select-html");

// Global variables
let allEpisodes;

// Fetch episodes function
function setup() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      makePageForEpisodes(result);
      buildEpisodeDropdownList(result);
    });
}

window.onload = setup;

// level 100

// Create an input element inside the rootEle

function makePageForEpisodes(episodeList) {
  // const searchCountHtml = document.createElement("span"); // Creating the top span element inside the rootEle
  const cardsContainerHtml = document.createElement("div"); // Creating the cards container element inside the rootEl

  // searchCountHtml.classList.add("search-count");
  cardsContainerHtml.classList.add("cards-container");

  // Loop through each episode and create a card for it

  episodeList.forEach((episode, index) => {
    // Get the episode name, season number, episode number, and combine them
    const episodeName = episode.name;
    const paddedSeasonNum = ("0" + episode.season).slice(-2);
    const paddedEpisodeNum = ("0" + episode.number).slice(-2);
    const episodeNameNum = `${episodeName} - S${paddedSeasonNum}E${paddedEpisodeNum}`;

    // Create the episode card elements
    const episodeImageSrc = episode.image.medium;
    const episodeDescription = episode.summary;

    const episodeCardHtml = document.createElement("div");
    episodeCardHtml.classList.add("episode-card");
    episodeCardHtml.id = "episode-card" + index;

    const episodeNameNumHolderHtml = document.createElement("div");
    episodeNameNumHolderHtml.classList.add("episode-name-num-holder");

    // Creating a span inside our span element
    const episodeNameNumTextHtml = document.createElement("span");
    episodeNameNumTextHtml.classList.add("episode-name-num-text");
    episodeNameNumTextHtml.textContent = episodeNameNum;

    const imageContainerHtml = document.createElement("div");
    imageContainerHtml.classList.add("episode-image-container");

    // Get the episode image and description
    const episodeImageHtml = document.createElement("img");
    episodeImageHtml.classList.add("medium-img");
    episodeImageHtml.src = episodeImageSrc;

    const episodeDescriptionContainerHtml = document.createElement("div");
    episodeDescriptionContainerHtml.classList.add(
      "episode-description-container"
    );

    const episodeDescriptionTextHtml = document.createElement("p");
    episodeDescriptionTextHtml.classList.add("episode-description-text");
    episodeDescriptionTextHtml.innerHTML = episodeDescription;

    // Update info about displayed episodes
    searchResultDisplayHtml.textContent = `Displaying ${cardsContainerHtml.length}/${episodeList.length} episodes`;

    // Add the episode card elements to the container
    episodeNameNumHolderHtml.appendChild(episodeNameNumTextHtml);
    episodeCardHtml.appendChild(episodeNameNumHolderHtml);
    episodeCardHtml.appendChild(imageContainerHtml);
    imageContainerHtml.appendChild(episodeImageHtml);
    episodeDescriptionContainerHtml.appendChild(episodeDescriptionTextHtml);
    episodeCardHtml.appendChild(episodeDescriptionContainerHtml);
    cardsContainerHtml.appendChild(episodeCardHtml);
    rootHtml.appendChild(cardsContainerHtml);
  });
}

// level 200

// function to search

function displaySearchedEpisodes(inputValue) {
  // creating a fresh array which only holds the episodes that match our search criteria
  const filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(inputValue) ||
      episode.summary.toLowerCase().includes(inputValue)
    );
  });

  // Display searchedEpisodes
  if (filteredEpisodes.length !== 0) {
    rootHtml.innerHTML = "";
    makePageForEpisodes(filteredEpisodes);
  }
  searchResultDisplayHtml.textContent = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`;
}

// List of event listeners (Should be always at the bottom)

searchInputHtml.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  displaySearchedEpisodes(inputValue);
});

// level 300

// jump to episode function

function jumpToEpisode(event) {
  // console.log(event.target);
  const episodeSelectHTML = document.querySelector("#select-html"); // this is the dropdown
  const position = episodeSelectHTML.value; // we set a variable for the value which is the number
  // displaySearchedEpisodes(episodeSelectHTML);
  const episodeSelectHTMLId = "episode-card" + position; // position is from the dropdown list; we are making the id will will find
  document.getElementById(episodeSelectHTMLId).scrollIntoView({
    block: "center",
    behavior: "smooth",
  });
}

// build selection dropdown list

function buildEpisodeDropdownList(episodeList) {
  const episodeSelectHTML = document.querySelector("#select-html");
  // Create the option element (inside the episodeSelectHTML)

  for (let i = 0; i < episodeList.length; i++) {
    const episodeOptionHTML = document.createElement("option");
    const optionEpisodeName = episodeList[i].name;
    const optionSeasonPadded = ("0" + episodeList[i].season).slice(-2);
    const optionEpisodePadded = ("0" + episodeList[i].number).slice(-2);
    // const episodeOptionValue = `S${optionEpisodeName} - S${optionSeasonPadded}E${optionEpisodePadded}`;
    const episodeOptionTextHtml = `S${optionSeasonPadded}E${optionEpisodePadded} - ${optionEpisodeName}`;

    episodeOptionHTML.textContent = episodeOptionTextHtml; // it is the episode list showing on the dropdown list
    episodeOptionHTML.value = i; // the value of the dropdown item is stored as i from the for loop
    episodeSelectHTML.appendChild(episodeOptionHTML); // we append each of the episodes into the episodeSelectHTML

    episodeSelectHTML.addEventListener("change", jumpToEpisode);
  }
}
