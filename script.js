//Get DOM elements
const rootElem = document.getElementById("root"); // Get the root element where we'll add the episode cards
const searchInput = document.getElementById("search-input");
const searchSpan = document.querySelector(".search-info");
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
  const searchCountEle = document.createElement("span"); // Creating the top span element inside the rootEle
  const cardsContainer = document.createElement("div"); // Creating the cards container element inside the rootEl

  searchCountEle.classList.add("search-count");
  cardsContainer.classList.add("cards-container");

  rootElem.appendChild(cardsContainer);

  // Loop through each episode and create a card for it

  episodeList.forEach((episode, index) => {
    // Get the episode name, season number, episode number, and combine them
    const episodeName = episode.name;
    const paddedSeasonNum = ("0" + episode.season).slice(-2);
    const paddedEpisodeNum = ("0" + episode.number).slice(-2);
    const episodeNameNum = `${episodeName} - S${paddedSeasonNum}E${paddedEpisodeNum}`;

    const episodeImageSrc = episode.image.medium; // Get the episode image and description
    // Create the episode card elements
    const episodeDescription = episode.summary;

    const episodeInfoCard = document.createElement("div");
    episodeInfoCard.classList.add("episode-info-card");
    episodeInfoCard.id = "episode-card" + index;

    const episodeNameNumHolder = document.createElement("div");
    episodeNameNumHolder.classList.add("episode-name-num-holder");

    // Creating a span inside our span element
    const episodeNameNumElement = document.createElement("span");
    episodeNameNumElement.classList.add("episode-name-num-text");
    episodeNameNumElement.textContent = episodeNameNum;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("episode-image-container");

    const episodeImage = document.createElement("img");
    episodeImage.classList.add("medium-img");
    episodeImage.src = episodeImageSrc;

    const episodeDescriptionTextContainer = document.createElement("div");
    episodeDescriptionTextContainer.classList.add(
      "episode-description-container"
    );

    const episodeDescriptionTextElement = document.createElement("p");
    episodeDescriptionTextElement.classList.add("episode-description");
    episodeDescriptionTextElement.innerHTML = episodeDescription;

    // Update info about displayed episodes
    searchSpan.textContent = `Displaying 0/${episodeList.length} episodes`;

    // Add the episode card elements to the container
    episodeNameNumHolder.appendChild(episodeNameNumElement);
    episodeInfoCard.appendChild(episodeNameNumHolder);
    episodeInfoCard.appendChild(imageContainer);
    imageContainer.appendChild(episodeImage);
    episodeDescriptionTextContainer.appendChild(episodeDescriptionTextElement);
    episodeInfoCard.appendChild(episodeDescriptionTextContainer);
    cardsContainer.appendChild(episodeInfoCard);
  });
}

// level 200

// function to search

function displaySearchedEpisodes(inputValue) {
  /*
    allEpisodes [{}, {}, {}] => each episode is an object with props **the data from episodes.js**
    arrayCollectionOfNameNumEpisode => an array of CURRENT nodes **from the dom**
    each array element has access to .textContent
  */

  // creating a fresh array which only holds the episodes that match our search criteria
  const filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(inputValue) ||
      episode.summary.toLowerCase().includes(inputValue)
    );
  });

  // Display searchedEpisodes
  if (filteredEpisodes.length !== 0) {
    rootElem.innerHTML = "";
    makePageForEpisodes(filteredEpisodes);
  }
  searchSpan.textContent = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`;
}

// List of event listeners (Should be always at the bottom)

searchInput.addEventListener("input", (event) => {
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
    const episodeOptionText = `S${optionSeasonPadded}E${optionEpisodePadded} - ${optionEpisodeName}`;

    episodeOptionHTML.textContent = episodeOptionText; // it is the episode list showing on the dropdown list
    episodeOptionHTML.value = i; // the value of the dropdown item is stored as i from the for loop
    episodeSelectHTML.appendChild(episodeOptionHTML); // we append each of the episodes into the episodeSelectHTML

    episodeSelectHTML.addEventListener("change", jumpToEpisode);
  }
}

// window.scrollTo({
//   top:
//     Math.round(
//       card.getBoundingClientRect().top + document.documentElement.scrollTop
//     ) - 100,
//   behavior: "smooth",
// });
