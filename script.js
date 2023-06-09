//Get DOM elements
const rootHtml = document.getElementById("root"); // Get the root element where we'll add the episode cards
const episodeSearchInputHtml = document.getElementById("episode-search-input");
const showSearchInputHtml = document.getElementById("show-search-input");
const episodeSearchResultDisplayHtml = document.querySelector(".display-episode-search");
const showSearchResultDisplayHtml = document.querySelector(".display-show-search");
const episodeSelectHtml = document.querySelector("#episode-select-html");
const showSelectHtml = document.querySelector("#show-select-html");
const showListingButton = document.querySelector("#show-listing-button");

// Global variables
let allEpisodes;
let allShows;

window.onload = setup;

// Fetch episodes function
function setup() {
  allShows = getAllShows().sort((a, b) => {
    return a.name.localeCompare(b.name); // sort shows into alphabeltical order by comparing string, not numbers
  });

  buildShowDropdownList(allShows);
  makePageForShows(allShows);
}

function fetchShowEpisodes(showId) {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`) // returns a promise and it is pending
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json(); // returns the promise as fulfilled and gives us a response object which we pass into the callback function
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((data) => {
      allEpisodes = data;
      showSearchInputHtml.value = "";
      makePageForEpisodes(allEpisodes);
      buildEpisodeDropdownList(allEpisodes);
    })
    .catch((error) => {
      console.log(error);
    });
}

// level 100

/*
  If the user clicks show select then the show select will disappear
  If the user clicks the see show listing button then the episodes will disappear and the shows will appear also the episode list should not be shown initially
*/

function toggleVisibility(showElement, hideElement) {
  showElement.style.display = "inline"; // makes the element visible
  hideElement.style.display = "none"; // hides the element
}

function getFormattedEpisodeNameInDropdown(episode) {
  const episodeTitle = episode.name;
  const paddedSeasonNum = ("0" + episode.season).slice(-2);
  const paddedEpisodeNum = ("0" + episode.number).slice(-2);
  return `S${paddedSeasonNum}E${paddedEpisodeNum} - ${episodeTitle}`;
}

function getFormattedEpisodeNameInEpisodeCards(episode) {
  const paddedSeasonNum = ("0" + episode.season).slice(-2);
  const paddedEpisodeNum = ("0" + episode.number).slice(-2);
  return `${episode.name} - S${paddedSeasonNum}E${paddedEpisodeNum}`;
}

function makePageForEpisodes(episodeList) {
  // make the episode dropdown list visible and hide the show dropdown list
  toggleVisibility(episodeSelectHtml, showSelectHtml);
  // make the episode searchbar visible and hide the show searchbar from show page
  toggleVisibility(episodeSearchInputHtml, showSearchInputHtml);
  // make the episode search result visible and hide the show search result
  toggleVisibility(episodeSearchResultDisplayHtml, showSearchResultDisplayHtml);

  showSearchInputHtml.removeEventListener("input", searchForShow);
  episodeSearchInputHtml.addEventListener("input", searchForEpisode);

  rootHtml.innerHTML = "";
  const cardsContainerHtml = document.createElement("div"); // Creating the cards container element inside the rootEl

  cardsContainerHtml.classList.add("episode-cards-container");

  // Loop through each episode and create a card for it

  episodeList.forEach((episode, index) => {
    // Get the episode name, season number, episode number, and combine them using the right function
    const episodeNameNumSeasonCombo = getFormattedEpisodeNameInEpisodeCards(episode);

    // Create the episode card elements

    const episodeCardHtml = document.createElement("div");
    episodeCardHtml.classList.add("episode-card");
    episodeCardHtml.id = "episode-card" + index;

    // Get the episode title

    const episodeNameNumSeasonComboHolderHtml = document.createElement("div");
    const episodeNameNumSeasonComboTextHtml = document.createElement("span");
    episodeNameNumSeasonComboHolderHtml.classList.add(
      "episode-name-num-holder"
    );
    episodeNameNumSeasonComboTextHtml.classList.add("episode-name-num-text");
    episodeNameNumSeasonComboTextHtml.textContent = episodeNameNumSeasonCombo;

    // Get the episode image

    const episodeImageHtml = document.createElement("img");
    const episodeImageSrc = episode.image?.medium;
    const episodeImageContainerHtml = document.createElement("div");
    episodeImageHtml.classList.add("medium-img");
    episodeImageContainerHtml.classList.add("episode-image-container");
    episodeImageHtml.src = episodeImageSrc;

    // Get the episode summary
    const episodeSummaryTextHtml = document.createElement("p");
    const episodeSummaryContainerHtml = document.createElement("div");
    episodeSummaryTextHtml.classList.add("episode-summary-text");
    episodeSummaryContainerHtml.classList.add("episode-summary-container");
    const episodeSummary = episode.summary;
    episodeSummaryTextHtml.innerHTML = episodeSummary;

    // Update info about displayed episodes
    episodeSearchResultDisplayHtml.textContent = `Displaying ${index + 1}/${
      episodeList.length
    } episodes`;

    // Add the episode card elements to the container
    episodeNameNumSeasonComboHolderHtml.appendChild(
      episodeNameNumSeasonComboTextHtml
    );
    episodeCardHtml.appendChild(episodeNameNumSeasonComboHolderHtml);
    episodeCardHtml.appendChild(episodeImageContainerHtml);
    episodeImageContainerHtml.appendChild(episodeImageHtml);
    episodeSummaryContainerHtml.appendChild(episodeSummaryTextHtml);
    episodeCardHtml.appendChild(episodeSummaryContainerHtml);
    cardsContainerHtml.appendChild(episodeCardHtml);
    rootHtml.appendChild(cardsContainerHtml);
  }); // end of for.each
  window.scrollTo(0, 0); // scroll to top of the page (when x-axis and y- axix zero)
}

// level 200

// function to search episodes that matches with inputValue

function displaySearchedEpisodes(inputValue) {
  // creating a fresh array which only holds the episodes that match our search criteria
  const filteredEpisodes = allEpisodes.filter((episode) => {
    if (episode.summary !== null && episode.name !== null) {
      return (
        episode.name.toLowerCase().includes(inputValue) ||
        episode.summary.toLowerCase().includes(inputValue)
      );
    }
  });

  // Display searchedEpisodes
  rootHtml.innerHTML = "";
  makePageForEpisodes(filteredEpisodes);
  // makePageForEpisodes(episodeList);
  buildEpisodeDropdownList(filteredEpisodes);

  episodeSearchResultDisplayHtml.textContent = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`;
}

// level 300

// jump to episode function

function jumpToEpisode(event) {
  const episodeSelectHtml = document.querySelector("#episode-select-html"); // this is the episode dropdown element

  const selectedEpisode = allEpisodes.filter((episode) => {
    return episode.name === episodeSelectHtml.value;
  });
  rootHtml.innerHTML = "";
  makePageForEpisodes(selectedEpisode);
}

// build selection dropdown list

function buildEpisodeDropdownList(episodeList) {
  const episodeSelectHtml = document.querySelector("#episode-select-html"); // this is the episode dropdown element
  episodeSelectHtml.innerHTML = "";

  // Create the option element (inside the episodeSelectHTML)

  for (let i = 0; i < episodeList.length; i++) {
    const episodeOptionHtml = document.createElement("option");
    const optionEpisodeName = episodeList[i].name;
    const episode = episodeList[i];
    const episodeOptionTextHtml = getFormattedEpisodeNameInDropdown(episode);

    episodeOptionHtml.textContent = episodeOptionTextHtml; // it is the episode list showing on the dropdown list
    // episodeOptionHtml.value = i; // the value of the dropdown item is stored as i from the for loop
    episodeOptionHtml.value = episodeList[i].name; // the value of the dropdown item is stored as i from the for loop
    episodeSelectHtml.appendChild(episodeOptionHtml); // we append each of the episodes into the episodeSelectHTML

    episodeSelectHtml.addEventListener("change", jumpToEpisode);
  }
}

// level 400

function buildShowDropdownList(allShows) {
  for (let i = 0; i < allShows.length; i++) {
    const showOptionHtml = document.createElement("option");

    // Get information
    const optionShowName = allShows[i].name;

    // (When we give the show id, the API will return a different show)
    showOptionHtml.value = allShows[i].id;

    // update text content for showOptionHml
    showOptionHtml.textContent = optionShowName;
    showSelectHtml.appendChild(showOptionHtml);
  }
  showSelectHtml.addEventListener("change", (event) =>
    fetchShowEpisodes(event.target.value)
  ); // event.target is a DOM element which is the select element containing all the show options. event.target always refers to the element that triggered that event. The value of the select element is the value of the selected option element and event.target.value is a property of that the select element which contains the id in this case
}

// level 500

function makePageForShows(allShows) {
  showSelectHtml.value = "";
  // make the show dropdown list visible and hide the episode dropdown list
  toggleVisibility(showSelectHtml, episodeSelectHtml);
  // make the show searchbar visible and hide the episode searchbar from show page
  toggleVisibility(showSearchInputHtml, episodeSearchInputHtml);
  // make the show search result visible and hide the episode search result
  toggleVisibility(showSearchResultDisplayHtml, episodeSearchResultDisplayHtml);

  rootHtml.innerHTML = "";
  const cardsContainerHtml = document.createElement("div"); // Creating the cards container element inside the rootEl

  episodeSearchInputHtml.removeEventListener("input", searchForEpisode);
  showSearchInputHtml.addEventListener("input", searchForShow);

  // searchCountHtml.classList.add("search-count");
  cardsContainerHtml.classList.add("show-cards-container");

  // Loop through each show and create a card for it

  allShows.forEach((show, index) => {
    // Create the show card elements

    const showCardHtml = document.createElement("div");
    showCardHtml.classList.add("show-card");

    const showImageSummaryInfoContainerHtml = document.createElement("div");
    showImageSummaryInfoContainerHtml.classList.add(
      "show-image-summary-info-container"
    );

    // Get the show name
    const showName = show.name;
    const showNameTextHtml = document.createElement("p");
    const showNameContainerHtml = document.createElement("div");
    showNameTextHtml.classList.add("show-name-text");
    showNameContainerHtml.classList.add("show-name-container");
    showNameTextHtml.innerHTML = showName;

    // Get the show image

    const showImageSrc = show.image?.medium;
    const showImageHtml = document.createElement("img");
    const showImageContainerHtml = document.createElement("div");
    showImageHtml.classList.add("medium-img");
    showImageContainerHtml.classList.add("show-image-container");
    showImageHtml.src = showImageSrc;

    // Get the show summary

    const showSummary = show.summary;
    const showSummaryTextHtml = document.createElement("p");
    const showSummaryContainerHtml = document.createElement("div");
    showSummaryTextHtml.classList.add("show-summary-text");
    showSummaryContainerHtml.classList.add("show-summary-container");
    showSummaryTextHtml.innerHTML = showSummary;

    // Create the show basic info container elements

    const showBasicInfoContainerHtml = document.createElement("div");
    showBasicInfoContainerHtml.classList.add("show-info-container");

    // accessing the elements from the data
    const showRating = show.rating.average;
    const showGenre = show.genres;
    const showStatus = show.status;
    const showRuntime = show.runtime;

    // creating a rating element and its value inside showBasicInfoContainerHtml

    const showRatingDescriptionHtml = document.createElement("span");
    const showRatingValueHtml = document.createElement("span");
    const showRatingContainer = document.createElement("p");
    showRatingValueHtml.classList.add("show-rating-value");
    showRatingDescriptionHtml.classList.add("show-rating-description");
    showRatingContainer.classList.add("show-rating-container");
    showRatingDescriptionHtml.innerText = "Rated: ";
    showRatingValueHtml.innerHTML = `${showRating}`;

    // creating a genre element and its value inside showBasicInfoContainerHtml

    const showGenreDescriptionHtml = document.createElement("span");
    const showGenreValueHtml = document.createElement("span");
    const showGenreContainer = document.createElement("p");
    showGenreValueHtml.classList.add("show-genre-value");
    showGenreDescriptionHtml.classList.add("show-genre-description");
    showGenreContainer.classList.add("show-genre-container");
    showGenreDescriptionHtml.innerText = "Genres: ";
    showGenreValueHtml.innerHTML = `${showGenre}`.split(",").join(", ");

    // creating a status element and its value inside showBasicInfoContainerHtml

    const showStatusValueHtml = document.createElement("span");
    const showStatusDescriptionHtml = document.createElement("span");
    const showStatusContainer = document.createElement("p");
    showStatusValueHtml.classList.add("show-status-value");
    showStatusDescriptionHtml.classList.add("show-status-description");
    showStatusContainer.classList.add("show-status-container");
    showStatusDescriptionHtml.innerText = "Status: ";
    showStatusValueHtml.innerHTML = `${showStatus}`;

    // creating a showRuntime element and its value inside showBasicInfoContainerHtml

    const showRuntimeValueHtml = document.createElement("span");
    const showRuntimeDescriptionHtml = document.createElement("span");
    const showRuntimeContainer = document.createElement("p");
    showRuntimeValueHtml.classList.add("show-runtime-value");
    showRuntimeDescriptionHtml.classList.add("show-runtime-description");
    showRuntimeContainer.classList.add("show-runtime-container");
    showRuntimeDescriptionHtml.innerText = "Runtime: ";
    showRuntimeValueHtml.innerHTML = `${showRuntime}`;

    // putting showNameContainer inside showCardHtml

    showCardHtml.appendChild(showNameContainerHtml);
    showNameContainerHtml.appendChild(showNameTextHtml);

    // putting showImageSummaryInfoContainerHtml inside showCardHtml

    showCardHtml.appendChild(showImageSummaryInfoContainerHtml);

    // putting showImageContainerHtml inside showImageSummaryInfoContainerHtml and putting the show image inside the show image holder

    showImageSummaryInfoContainerHtml.appendChild(showImageContainerHtml);
    showImageContainerHtml.appendChild(showImageHtml);

    // putting showSummaryContainerHtml inside showImageSummaryInfoContainerHtml and putting the show summary text inside the show summary holder
    showImageSummaryInfoContainerHtml.appendChild(showSummaryContainerHtml);
    showSummaryContainerHtml.appendChild(showSummaryTextHtml);

    // putting showBasicInfoContainerHtml (containing raiting, genres, status and runtime) inside showImageSummaryInfoContainerHtml and putting the showImageSummaryInfoContainerHtml inside the showCardHtml which goes inside the cardsContainerHtml which is inside the rootHtml
    showImageSummaryInfoContainerHtml.appendChild(showBasicInfoContainerHtml);
    showCardHtml.appendChild(showImageSummaryInfoContainerHtml);
    cardsContainerHtml.appendChild(showCardHtml);
    rootHtml.appendChild(cardsContainerHtml);

    // creating rating items inside the rating container and appending to showBasicInfoContainerHtml
    showRatingContainer.appendChild(showRatingDescriptionHtml);
    showRatingContainer.appendChild(showRatingValueHtml);
    showBasicInfoContainerHtml.appendChild(showRatingContainer);

    // creating genre items inside the rating container and appending to showBasicInfoContainerHtml
    showGenreContainer.appendChild(showGenreDescriptionHtml);
    showGenreContainer.appendChild(showGenreValueHtml);
    showBasicInfoContainerHtml.appendChild(showGenreContainer);

    // creating status items inside the rating container and appending to showBasicInfoContainerHtml
    showStatusContainer.appendChild(showStatusDescriptionHtml);
    showStatusContainer.appendChild(showStatusValueHtml);
    showBasicInfoContainerHtml.appendChild(showStatusContainer);

    // creating runtime items inside the rating container and appending to showBasicInfoContainerHtml
    showRuntimeContainer.appendChild(showRuntimeDescriptionHtml);
    showRuntimeContainer.appendChild(showRuntimeValueHtml);
    showBasicInfoContainerHtml.appendChild(showRuntimeContainer);

    // when we click anywhere on the showCardHtml it takes us to that particular show episodes page
    showCardHtml.addEventListener("click", () => fetchShowEpisodes(show.id));
  });
  window.scrollTo(0, 0); // scroll to top of the page (when x-axis and y- axix zero)
}

showListingButton.addEventListener ("click", () => {
  // the argument after "click" should be a reference to a function, but when the function is called with allShows in this case then it won't be a reference, it will be the return value of the function
  episodeSearchInputHtml.value = "";
  makePageForShows(allShows);
}); 


// function to search shows that matches with inputValue

function displaySearchedShows(inputValue) {
  // creating a fresh array which only holds the episodes that match our search criteria
  const filteredShows = allShows.filter((show) => {
    if (show.summary !== null && show.name !== null) {
      return (
        show.name.toLowerCase().includes(inputValue) ||
        show.summary.toLowerCase().includes(inputValue)
      );
    }
  });

  // Display searchedEpisodes
  rootHtml.innerHTML = "";
  makePageForShows(filteredShows);
  buildShowDropdownList(filteredShows);

  showSearchResultDisplayHtml.textContent = `Displaying ${filteredShows.length}/${allShows.length} shows`;
}


// Creating two different functions 

// List of event listeners (Should be always at the bottom)

function searchForShow(event) {

  const inputValue = event.target.value.trim().toLowerCase(); // target is the dom element in which the input is happening and .value is the text that is being entered
  displaySearchedShows(inputValue);
};


// List of event listeners (Should be always at the bottom)

function searchForEpisode (event) {

  const inputValue = event.target.value.trim().toLowerCase(); // target is the dom element in which the input is happening and .value is the text that is being entered
  displaySearchedEpisodes(inputValue);
};

