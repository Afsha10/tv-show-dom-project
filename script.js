//You can edit ALL of the code here
/*
Pseudocode for level 100:
1. We are working with an episode list which is an array
  - create a container using JS connected to "#root"
  - we might need an H1 tag
  - we create a draft of our web page using HTML and CSS 
  - we then convert the HTML elements to JS by creating variables and append them inside the other according to our HTML tree layout as below 
  
  <div id="root">
    <input id="search-input"/>
    <span class="search-result-info">Displaying<span class="serach-count">searchCountEle</span>/73 episodes</span>
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
      </div>
  </div>

2. For getting each episode we need to access each element inside the array of objects in episodes.js.

3. For each episode element we would need to have name of the episodes, series and episode numbers, image of the episode, and brief description of the movie
  - for those we would need to create div, h2, img, p (description) elements for each episode.

*/

/*
Pseudocode for level 200
1. we need to create an input element that will take in text
    a) create the element in JS (google what method to use in JS for that)
    var x = document.createElement("input");
    b) we append the input element inside the root element

2. capture the value of the input   
2. we could console.log whatever is typed into the input
3. filter through the episodes and match with the enteredInput (we take in all the episodes and use filter method to only display the ones that match)
4. display the results of the search result 

To make it work:
1. refactor the code
2. 


extra: add h1 "tv guide"
*/

// function showing all episodes

let allEpisodes;

function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// level 100

  // Create an input element inside the rootEle

  const rootEle = document.getElementById("root");
  
  function makePageForEpisodes(episodeList) {
    // Get the root element where we'll add the episode cards
    const rootEle = document.getElementById("root");

    // creating a span inside our span element
    // creating the top span element inside the rootEle
    
    const searchCountEle = document.createElement("span");
    const searchResultInfo = document.createElement("span");
    const cardsContainer = document.createElement("div");

    searchCountEle.classList.add("search-count");
    cardsContainer.classList.add("cards-container");
    searchResultInfo.classList.add("search-result-info");

    // searchCountEle.textContent = filteredEpisodes.length;

    //  `Displaying <span class="search-count">13</span>/73 episodes`
    
    searchResultInfo.textContent = `Displaying ${searchCountEle}/${episodeList.length} episodes`;
    rootEle.appendChild(searchResultInfo);
    rootEle.appendChild(cardsContainer);

    // Creating the cards container element inside the rootEl

    // Loop through each episode and create a card for it
    episodeList.forEach((episode) => {
      // Get the episode name, season number, episode number, and combine them
      const episodeName = episode.name;
      const seasonNum = ("0" + episode.season).slice(-2);
      const episodeNum = ("0" + episode.number).slice(-2);
      const episodeNameNum = `${episodeName} - S${seasonNum}E${episodeNum}`;

      // Get the episode image and description
      const episodeImageSrc = episode.image.medium;
      const episodeDescription = episode.summary;

      // Create the episode card elements
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

      // Add the episode card elements to the container
      episodeNameNumHolder.appendChild(episodeNameNumElement);
      episodeInfoCard.appendChild(episodeNameNumHolder);
      episodeInfoCard.appendChild(imageContainer);
      imageContainer.appendChild(episodeImage);
      episodeDescriptionTextContainer.appendChild(
        episodeDescriptionTextElement
      );
      episodeInfoCard.appendChild(episodeDescriptionTextContainer);
      cardsContainer.appendChild(episodeInfoCard);
    });
  }

// calling function setup

window.onload = setup;

// level 200

// function to search

const inputEle = document.createElement("input");
inputEle.id = "search-input";
rootEle.appendChild(inputEle);
inputEle.addEventListener("keyup", searchEpisodes);

// function to update the episodes

// Uncaught ReferenceError: episodeNameNumTextElement is not defined (170, 168, 156)

function searchEpisodes() {
  const searchInputField = document.querySelector("#search-input");
  const enteredInput = searchInputField.value.toLowerCase();
  const episodeDisplayCount = document.querySelector(".search-count");
  console.log(episodeDisplayCount)

/*   const collectionOfNameNumEpisode = document.querySelectorAll(".episode-name-num-text");
  // console.log(collectionOfNameNumEpisode);
  const arrayCollectionOfNameNumEpisode = Array.from(collectionOfNameNumEpisode)
  console.log(arrayCollectionOfNameNumEpisode[0]); 
*/

  


  /*
    allEpisodes [{}, {}, {}] => each episode is an object with props **the data from episodes.js**
    arrayCollectionOfNameNumEpisode => an array of CURRENT nodes **from the dom**

    each array element has access to .textContent

  */

  // creating a fresh array which only holds the episodes that match our search criteria
  const filteredEpisodes = allEpisodes.filter((episode) => {
    if (
      episode.name.toLowerCase().includes(enteredInput) ||
      episode.summary.toLowerCase().includes(enteredInput)
    ) {
      return episode;
    }
  });

  // // flush the content of the rootEle before adding in any content (by emptying the innerHTML of the rootEle)

  /*
  document.querySelector is null -> 202 -> 156
  */

  rootEle.innerHTML = "";

  // document.querySelector(".search-count").innerText = filteredEpisodes.length;
  // makePageForEpisodes(filteredEpisodes);
}




