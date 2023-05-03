//You can edit ALL of the code here
/*
Pseudocode:
1. We are working with an episode list which is an array
  - create a container using JS connected to "#root"
  - we might need an H1 tag
  - we create a draft of our web page using HTML and CSS 
  - we then convert the HTML elements to JS by creating variables and append them inside the other according to our HTML tree layout as below 
  
  <div id="root">
    <h1></h1>
    <div class="cards-container"
      <div class="episode-info-card">
        <div class="episode-name-num-holder">
          <h2 class="episode-name-num-text"></h2>
        </div>
        <img class= "medium-img" src="">
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

// functoins:

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  // Get the root element where we'll add the episode cards
  const rootElem = document.getElementById("root");

  // Create the page header and cards container
  rootElem.innerHTML = `<h1>Episodes (${episodeList.length})</h1>
                        <div class="cards-container"></div>`;

  // Get the cards container element
  const cardsContainer = rootElem.querySelector(".cards-container");

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

    const episodeNameNumTextElement = document.createElement("h2");
    episodeNameNumTextElement.classList.add("episode-name-num-text");
    episodeNameNumTextElement.textContent = episodeNameNum;

    const episodeImage = document.createElement("img");
    episodeImage.classList.add("medium-img");
    episodeImage.src = episodeImageSrc;

    const episodeDescriptionTextContainer = document.createElement("div");
    episodeDescriptionTextContainer.classList.add("episode-description-container");
    episodeInfoCard.appendChild(episodeDescriptionTextContainer);

    // creating a episodeDescriptionTextElement for each episode as the third child of episodeInfoCard. This will hold the episode description.

    const episodeDescriptionTextElement = document.createElement("p");
    episodeDescriptionTextElement.classList.add("episode-description");
    episodeDescriptionTextElement.innerHTML = episodeDescription;

    // Add the episode card elements to the container
    episodeNameNumHolder.appendChild(episodeNameNumTextElement);
    episodeInfoCard.appendChild(episodeNameNumHolder);
    episodeInfoCard.appendChild(episodeImage);
    episodeDescriptionTextContainer.appendChild(episodeDescriptionTextElement);
    episodeInfoCard.appendChild(episodeDescriptionTextContainer);
    cardsContainer.appendChild(episodeInfoCard);
  });
}


// calling function setup

window.onload = setup;

