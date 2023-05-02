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

    const episodeDescriptionTextElement = document.createElement("p");
    episodeDescriptionTextElement.classList.add("episode-description");
    episodeDescriptionTextElement.innerHTML = episodeDescription;

    // Add the episode card elements to the container
    episodeNameNumHolder.appendChild(episodeNameNumTextElement);
    episodeInfoCard.appendChild(episodeNameNumHolder);
    episodeInfoCard.appendChild(episodeImage);
    episodeInfoCard.appendChild(episodeDescriptionTextElement);
    cardsContainer.appendChild(episodeInfoCard);
  });
}
