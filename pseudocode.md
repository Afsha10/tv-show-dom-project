You can edit ALL of the code here

Pseudocode for level 100:

1. We are working with an episode list which is an array

- create a container using JS connected to "#root"
- we might need an H1 tag
- we create a draft of our web page using HTML and CSS
- we then convert the HTML elements to JS by creating variables and append them inside the other according to our HTML tree layout as below

  <input id="search-input"/>
  <span class="search-display">Displaying<span class="serach-count">searchCountEle</span>/73 episodes</span>
  <div id="root">
    <div class="cards-container">
      <div class="episode-card">
        <span class="episode-name-num-holder">
          <p class="episode-name-num-text"></p>
        </span>
        <div class="">
          <img class= "medium-img" src="">
        </div>
        <div class="episode-description-container">
          <p class="episode-description"></p>
        </div>
      </div>
    </div>
  </div>

2. For getting each episode we need to access each element inside the array of objects in episodes.js.

3. For each episode element we would need to have name of the episodes, series and episode numbers, image of the episode, and brief description of the movie

- for those we would need to create div, h2, img, p (description) elements for each episode.

Pseudocode for level 200

1. we need to create an input element that will take in text
   a) create the element in JS (google what method to use in JS for that)
   var x = document.createElement("input");
   b) we append the input element inside the root element

2. capture the value of the input
3. we could console.log whatever is typed into the input
4. filter through the episodes and match with the enteredInput (we take in all the episodes and use filter method to only display the ones that match)
5. display the results of the search result

extra: add h1 "tv guide"

Level 300

Create Select element

1. Look up select documentation
2. Write out placeholder text (it takes the value attribute)
3. Connect the selectHTML elment in JavaScript
4. Console.log(selectHTML)
   </li>
   `;
   })
   .join('');
   charactersList.innerHTML = htmlString;
   };

loadCharacters();
Create option element for each episode

1. We created an option element for each episode
2. We updated option value attribute with setAttribute
3. We updated option text with textContent
4. Append optionHTML inside SelectHTML

Pinned header to the top of the site.

1. Change header position to fixed
2. Added a top value of 0
3. updated background-color

4. If the value attribute from optionHTML

Create scroll to card functionality

1. Check value attribute from optionHTML is included (.includes) in episodeNameNumElement.textContent
2. If value is included then find episodeNameNumElement and save to variable
3. use variable.scrollIntoView({behaviour: smooth}) to scroll down to card.

lesson from level 300: we can not only set up classes but also we can add unique ids to each item inside our array and it is easier to jump around and delete things because we know which position we are. The pattern is give in a for loop to give each card a unique identifier based on the number of its position. By giving an id, we can do stuff with the unique ones.

alternative:

[Set Attribute](<https://www.javatpoint.com/javascript-setattribute#:~:text=%E2%86%92%20%E2%86%90%20prev-,JavaScript%20setAttribute(),update%20the%20existing%20attribute's%20value.>)

To display the selected episode we will need to apply a filtering logic based on the value obtained from the change event listener, instead of just using console.log and printing out the selected episode's value.

const optionValue = `S${episodeName} - S${seasonNum}E${episodeNum}`; <= Same as episodeNameNumElement
const optionText = `S${seasonNum}E${episodeNum} - ${episodeName}`;

<body>
    <header class="search-bar">
      <select id="select-html">
        <option value="">All episodes</option>
      </select>
      <input type="text" id="search-input" placeholder="Search episode(s)" />
      <span class="search-info"></span>
    </header>
    <h1>TV Show Guide</h1>
    <p class="directing-users">
      Please select an episode from the top left menu
    </p>
    <div id="root">
      <!-- 
      <span class="search-count"></span>
      <div class="cards-container">
        <div class="episode-info-card">
          <span class="episode-name-num-holder">
            <p class="episode-name-num-text"></p>
          </span>
          <div class="">
            <img class= "medium-img" src="">
          </div>
          <div class="episode-description-container">
            <p class="episode-description"></p>
          </div>
        </div>
      </div> -->
    </div>
    <!-- Loads a provided function called getAllEpisodes() which returns all episodes -->
    <script src="episodes.js"></script>

    <!-- Loads YOUR javascript code -->
    <script src="script.js"></script>
    <footer>
      <p id="source">Source: TVMaze.com</p>
    </footer>

  </body>

rootHtml.innerHTML = ""; // for enhanced experience we should always reset the rootHtml to nothing and if results are not equal to zero. We can make episodes for page because this is what empties everything and we could have a choice saying if not equal to 0, makePageForEpisodes, else "no results found". This condition meant that we never reset the page with the facts that there were no results.

## Level 400

```txt


  const allShows = getAllShows().map(show => show.name).sort()
  order allShows alphetically - later look at case-insensitive

  const allShowsAlphebetical = getAllShows() but alphabetical!

  create select element for dropdown of shows. We get the dropdown list from the array of objects

  const showSelectHtml = document.createElement('select')

  <select> => allows user to choose show from allShows array

  for (let i = 0; i < allShows.length; i++) {
    const showOptionHtml = document.createElement("option");

    Get information
    const optionShowName = allShowsAlphebetical[i].name;

    (When we give the show id, the API will return a different show)
    showOptionHtml.value = allShowsAlphebetical[i].id; // the value of the dropdown item is stored as i from the for loop

    update text content for showOptionHml
    showOptionHtml.textContent = optionShowName;

    showSelectHtml.addEventListener("change", fetchShow);
  }

We find the SHOW_ID and use it in fetch https://api.tvmaze.com/shows/${SHOW_ID}/episodes to access all the episodes with their id.
1. we fetch first
2. display it


```

Make an html file
Make a new demo CSS file
Make a nice responsive design according to the requirement creating one card with one show and repeat it 6 times and see how it works on mobile or desktop.


Plan for making the shows cards clickible - level 500:
1. target each card which is
1. put an eventListener on each card

































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

/*
could you pass in an object like this
{
  input: value,
  "search-input", true
}
{
  input: value,
  "search-input"; false
}

*/



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
  // {
  //   input: event.target.value.trim().toLowerCase(),
  //   search: true,
  // }
  const inputValue = event.target.value.trim().toLowerCase();
  displaySearchedEpisodes(inputValue);
});

// level 300

// jump to episode function


function jumpToEpisode(event) {
  console.log("JumpToEpisode event.target", event.target);
  const episodeSelectHtml = document.querySelector("#episode-select-html"); // this is the dropdown
  const selectEpisodePosition = episodeSelectHtml.value; // we set a variable for the value which is the number
  const episodeSelectHtmlId = "episode-card" + selectEpisodePosition; // position is from the dropdown list; we are making the id will will find
  // displaySearchedEpisodes(episodeSelectHtml);

  /* Plan is to use the episodeSelectHtmlId how? */
  

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
    showCardHtml.appendChild(imageContainerHtml);
    imageContainerHtml.appendChild(showImageHtml);
    showDescriptionContainerHtml.appendChild(showDescriptionTextHtml);
    showCardHtml.appendChild(showDescriptionContainerHtml);
    showBasicInfoContainerHtml.appendChild(showRatingContainer);
    showBasicInfoContainerHtml.appendChild(showStatusTextHtml);
    showBasicInfoContainerHtml.appendChild(showRuntimeTextHtml);
    showBasicInfoContainerHtml.appendChild(showGenreTextHtml);
    showCardHtml.appendChild(showBasicInfoContainerHtml);
    cardsContainerHtml.appendChild(showCardHtml);
    rootHtml.appendChild(cardsContainerHtml);

    showCardHtml.addEventListener("click", takeToShow)

  });
}

function takeToShow() {
  console.log("Hi EMILIE");
}



need to do some destructuring like below:

function createEpisodeHeadingText(string) {
  const episodeNameNumSeasonComboHolderHtml = document.createElement("div");
  const episodeNameNumSeasonComboTextHtml = document.createElement("span");
  episodeNameNumSeasonComboHolderHtml.classList.add("episode-name-num-holder");
  episodeNameNumSeasonComboTextHtml.classList.add("episode-name-num-text");
  episodeNameNumSeasonComboTextHtml.textContent = string;
  return {
    episodeNameNumSeasonComboHolderHtml,
    episodeNameNumSeasonComboTextHtml
  }
}

// destructuring demo

const {
  episodeNameNumSeasonComboHolderHtml,
  episodeNameNumSeasonComboTextHtml
} = createEpisodeHeadingText('sometext') 

#



to make a search bar for both episode cards and shows card
- link the search bar with the episode cards when using makePageForEpisodes
- link the search bar with the show cards when using makePageForShow
