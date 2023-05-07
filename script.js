//Get DOM elements
const rootElem = document.getElementById("root");
const searchInput = document.getElementById("search-input");
const searchSpan = document.querySelector(".search-info");
const selectHTML = document.querySelector("#select-html");

// Global variables
let allEpisodes;

// Fetch episodes function
function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;

// level 100

// Create an input element inside the rootEle

function makePageForEpisodes(episodeList) {
  // Get the root element where we'll add the episode cards
  // creating a span inside our span element
  // creating the top span element inside the rootEle

  const searchCountEle = document.createElement("span");
  const cardsContainer = document.createElement("div");

  searchCountEle.classList.add("search-count");
  cardsContainer.classList.add("cards-container");

  // searchCountEle.textContent = filteredEpisodes.length;
  //  `Displaying <span class="search-count">13</span>/73 episodes`

  rootElem.appendChild(cardsContainer);

  // Creating the cards container element inside the rootEl

  // Loop through each episode and create a card for it
  for (let i = 0; i < episodeList.length; i++) {
    const episodeName = episodeList[i].name;
    const seasonNum = ("0" + episodeList[i].season).slice(-2);
    const episodeNum = ("0" + episodeList[i].number).slice(-2);
    console.log(seasonNum);
  }

  episodeList.forEach((episode) => {
    // Get the episode name, season number, episode number, and combine them
    const episodeName = episode.name;
    const seasonNum = ("0" + episode.season).slice(-2);
    const episodeNum = ("0" + episode.number).slice(-2);
    const episodeNameNum = `${episodeName} - S${seasonNum}E${episodeNum}`;
    const optionValue = `S${episodeName} - S${seasonNum}E${episodeNum}`;
    const optionText = `S${seasonNum}E${episodeNum} - ${episodeName}`;

    // Get the episode image and description
    const episodeImageSrc = episode.image.medium;
    // Create the episode card elements
    const episodeDescription = episode.summary;

    // Create the option element (inside the selectHTML)
    const optionHTML = document.createElement("option");
    optionHTML.setAttribute("value", optionValue);
    optionHTML.textContent = optionText;
    selectHTML.appendChild(optionHTML);

    // selectHTML.addEventListener('change', (e) => {

    // })

    const episodeInfoCard = document.createElement("div");
    episodeInfoCard.classList.add("episode-info-card");

    const episodeNameNumHolder = document.createElement("div");
    episodeNameNumHolder.classList.add("episode-name-num-holder");

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

// console.log(selectHTML);

// if (optionHTML.value.includes())
