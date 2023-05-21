//Get DOM elements
const rootHtml = document.getElementById("root"); // Get the root element where we'll add the episode cards
const searchInputHtml = document.getElementById("search-input");
const searchResultDisplayHtml = document.querySelector(".display-search");
const episodeSelectHtml = document.querySelector("#episode-select-html");
const showSelectHtml = document.querySelector("#show-html");

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

  // fetch(`https://api.tvmaze.com/shows/${allShows[0].id}/episodes`) // returns a promise and it is pending
  //   .then((response) => {
  //     if (response.status >= 200 && response.status <= 299) {
  //       return response.json(); // returns the promise as fulfilled and gives us a response object which we pass into the callback function
  //     } else {
  //       throw new Error(
  //         `Encountered something unexpected: ${response.status} ${response.statusText}`
  //       );
  //     }
  //   })
  //   .then((data) => {
  //     allEpisodes = data;
  //     makePageForEpisodes(data);
  //     buildEpisodeDropdownList(data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // console.log(allShows);

  // fetchShow(allShows[0]);
}

function fetchShow(tvShowId) {
  let SHOW_ID = tvShowId.target.value;
  fetch(`https://api.tvmaze.com/shows/${SHOW_ID}/episodes`) // returns a promise and it is pending
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
      makePageForEpisodes(allEpisodes);
      buildEpisodeDropdownList(allEpisodes);
    })
    .catch((error) => {
      console.log(error);
    });
}

// level 100

// Create an input element inside the rootEle

function makePageForEpisodes(episodeList) {
  // const searchCountHtml = document.createElement("span"); // Creating the top span element inside the rootEle
  rootHtml.innerHTML = "";
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
    const episodeImageSrc = episode.image?.medium;
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
    searchResultDisplayHtml.textContent = `Displaying ${index + 1}/${
      episodeList.length
    } episodes`;

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
  rootHtml.innerHTML = "";
  makePageForEpisodes(filteredEpisodes);
  // makePageForShows(allShows);
  buildEpisodeDropdownList(filteredEpisodes);

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
  console.log("JumpToEpisode event.target", event.target);
  const episodeSelectHtml = document.querySelector("#episode-select-html"); // this is the dropdown
  const selectEpisodePosition = episodeSelectHtml.value; // we set a variable for the value which is the number
  // displaySearchedEpisodes(episodeSelectHTML);
  const episodeSelectHtmlId = "episode-card" + selectEpisodePosition; // position is from the dropdown list; we are making the id will will find

  document.getElementById(episodeSelectHtmlId).scrollIntoView({
    block: "center",
    behavior: "smooth",
  });
}

// build selection dropdown list

function buildEpisodeDropdownList(episodeList) {
  const episodeSelectHtml = document.querySelector("#episode-select-html");
  episodeSelectHtml.innerHTML = "";

  // Create the option element (inside the episodeSelectHTML)

  for (let i = 0; i < episodeList.length; i++) {
    const episodeOptionHtml = document.createElement("option");
    const optionEpisodeName = episodeList[i].name;
    const optionSeasonPadded = ("0" + episodeList[i].season).slice(-2);
    const optionEpisodePadded = ("0" + episodeList[i].number).slice(-2);
    // const episodeOptionValue = `S${optionEpisodeName} - S${optionSeasonPadded}E${optionEpisodePadded}`;
    const episodeOptionTextHtml = `S${optionSeasonPadded}E${optionEpisodePadded} - ${optionEpisodeName}`;

    episodeOptionHtml.textContent = episodeOptionTextHtml; // it is the episode list showing on the dropdown list
    episodeOptionHtml.value = i; // the value of the dropdown item is stored as i from the for loop
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
    showSelectHtml.addEventListener("change", fetchShow);
  }
}


// level 500

function makePageForShows(allShows) {
  console.log(allShows);
  // const searchCountHtml = document.createElement("span"); // Creating the top span element inside the rootEle
  rootHtml.innerHTML = "";
  const cardsContainerHtml = document.createElement("div"); // Creating the cards container element inside the rootEl

  // searchCountHtml.classList.add("search-count");
  cardsContainerHtml.classList.add("cards-container");

  // Loop through each show and create a card for it

  allShows.forEach((show, index) => {
    // Get the show name, season number, show number, and combine them
  
    const showName = show.name;
    const showNameContainerHtml = document.createElement("div");
    showNameContainerHtml.classList.add("show-name-container");

    const showNameTextHtml = document.createElement("p");
    showNameTextHtml.classList.add("show-name-text");
    showNameTextHtml.innerHTML = showName;

    // Create the show card elements
    const showImageSrc = show.image?.medium;
    const showDescription = show.summary;

    const showCardHtml = document.createElement("div");
    showCardHtml.classList.add("show-card");

    const imageContainerHtml = document.createElement("div");
    imageContainerHtml.classList.add("show-image-container");

    // Get the show image and description
    const showImageHtml = document.createElement("img");
    showImageHtml.classList.add("medium-img");
    showImageHtml.src = showImageSrc;

    const showDescriptionContainerHtml = document.createElement("div");
    showDescriptionContainerHtml.classList.add(
      "show-description-container"
    );

    const showDescriptionTextHtml = document.createElement("p");
    showDescriptionTextHtml.classList.add("show-description-text");
    showDescriptionTextHtml.innerHTML = showDescription;

    const showRating = show.rating.average;    
    const showGenre = show.genres;
    const showStatus = show.status;
    const showRuntime = show.runtime;

    const showBasicInfoContainerHtml = document.createElement("div");
    showBasicInfoContainerHtml.classList.add("show-info-container");
    
    const showRatingValueHtml = document.createElement("span");
    const showRatingDescriptionHtml = document.createElement("span");
    const showRatingContainer = document.createElement("p");
    showRatingValueHtml.classList.add("show-rating-text");
    showRatingDescriptionHtml.classList.add("show-rating-span");
    showRatingDescriptionHtml.innerText = "Rated: "
    showRatingValueHtml.innerHTML = `${showRating}`;
    showRatingContainer.appendChild(showRatingDescriptionHtml)
    showRatingContainer.appendChild(showRatingValueHtml);

    const showGenreTextHtml = document.createElement("p");
    showGenreTextHtml.classList.add("show-genre-text");
    showGenreTextHtml.innerHTML = `Genres: ${showGenre}`;

    const showStatusTextHtml = document.createElement("p");
    showStatusTextHtml.classList.add("show-status-text");
    showStatusTextHtml.innerHTML = `Status: ${showStatus}`;

    const showRuntimeTextHtml = document.createElement("p");
    showRuntimeTextHtml.classList.add("show-runtime-text");
    showRuntimeTextHtml.innerHTML = `Runtime: ${showRuntime}`;
    
    showCardHtml.appendChild(showNameContainerHtml);
    showNameContainerHtml.appendChild(showNameTextHtml);
    showBasicInfoContainerHtml.appendChild(showRatingContainer);
    showBasicInfoContainerHtml.appendChild(showStatusTextHtml);
    showBasicInfoContainerHtml.appendChild(showRuntimeTextHtml);
    showBasicInfoContainerHtml.appendChild(showGenreTextHtml);
    showCardHtml.appendChild(showBasicInfoContainerHtml);
    showCardHtml.appendChild(imageContainerHtml);
    imageContainerHtml.appendChild(showImageHtml);
    showDescriptionContainerHtml.appendChild(showDescriptionTextHtml);
    showCardHtml.appendChild(showDescriptionContainerHtml);
    cardsContainerHtml.appendChild(showCardHtml);
    rootHtml.appendChild(cardsContainerHtml);

    showCardHtml.addEventListener("click", takeToShow)

  });
}

function takeToShow() {
  console.log("Hi EMILIE");
}
