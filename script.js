//You can edit ALL of the code here
/*
Pseudocode:
1. We are working with an episode list which is an array
  - create a container using JS connected to "#root"
  - we might need an H1 tag
  - we create a draft of our web page using HTML and CSS 
  - we then convert the HTML elements to JS by creating variables and append them inside the other according to our HTML tree layout as below 
  
  <div class="cards-container">
    <div class="episode-info-card">
      <div class="episode-name-num-holder">
        <p class="episode-name-num-text"></p>
      </div>
      <img class= "medium-img" src="">
      <p class="episode-description"></p>
  </div>

2. For getting each episode we need to access each element inside the array of objects in episodes.js.

3. For each episode element we would need to have name of the episodes, series and episode numbers, image of the episode, and brief description of the movie
  - for those we would need to create div, p, img, p (description) elements for each episode.

*/


// functoins:

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  // Accessing root element from HTML
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  
  console.log(episodeList);
  console.log(episodeList[0].airdate);

  for (let i = 0; i < episodeList.length; i++) {

    console.log(episodeList[i].name);

    // creating a cardsContainer as a direct child of root. This will hold multiple episode cards.

    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cards-container");
    rootElem.appendChild(cardsContainer);

    // creating an episodeInfoCard for each episode as a direct child of cardsContainer. This will hold episode name-number-text, images, description.

    const episodeInfoCard = document.createElement("div");
    episodeInfoCard.classList.add("episode-info-card");
    cardsContainer.appendChild(episodeInfoCard);

    // creating a episodeNameNumHolder for each episode as the first child of episodeInfoCard. This is the container for the holder of episode name, season and episode numbers.

    const episodeNameNumHolder = document.createElement("div");
    episodeNameNumHolder.classList.add("episode-name-num-holder");
    episodeInfoCard.appendChild(episodeNameNumHolder);

    // creating a episodeNameNumTextElement for each episode as a direct child of episodeNameNumHolder. This will hold the text info related to episode name, season and episode numbers.

    const episodeNameNumTextElement = document.createElement("p");
    episodeNameNumTextElement.classList.add("episode-name-num-text");
    episodeNameNumHolder.appendChild(episodeNameNumTextElement);
    let formattedSeasonNum = ("0" + episodeList[i].season).slice(-2);
    let formattedEpisodeNum = ("0" + episodeList[i].number).slice(-2);
    episodeNameNumHolder.innerText = `${episodeList[i].name} - S${formattedSeasonNum}E${formattedEpisodeNum}`

    // creating a episodeNameNumTextElement for each episode as the second child of episodeInfoCard. This will hold the image.

    const episodeImage = document.createElement("img");
    episodeImage.classList.add("medium-img");
    episodeInfoCard.appendChild(episodeImage);
    episodeImage.src = episodeList[i].image.medium;

    // creating a episodeNameNumTextElement for each episode as the third child of episodeInfoCard. This will hold the episode description.

    const episodeDescriptionTextElement = document.createElement("p");
    episodeDescriptionTextElement.classList.add("episode-description");
    episodeInfoCard.appendChild(episodeDescriptionTextElement);
    episodeDescriptionTextElement.innerText = episodeList[i].summary.slice(3,-4);
  }
}

// calling function setup

window.onload = setup;

