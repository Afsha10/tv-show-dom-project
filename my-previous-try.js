function makePageForEpisodes(episodeList) {
  // Accessing root element from HTML
  const rootElem = document.getElementById("root");
  rootElem.textContent = `${episodeList.length} episode(s)`;

  const topContainer = document.createElement("div");
  topContainer.classList.add("top-container");
  rootElem.appendChild(topContainer);

  console.log(episodeList);
  console.log(episodeList[0].airdate);

  for (let i = 0; i < episodeList.length; i++) {
    console.log(episodeList[i].name);

    // creating a cardsContainer as a direct child of root. This will hold multiple episode cards.

    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cards-container");
    topContainer.appendChild(cardsContainer);

    // creating an episodeInfoCard for each episode as a direct child of cardsContainer. This will hold episode name-number-text, images, description.

    const episodeInfoCard = document.createElement("div");
    episodeInfoCard.classList.add("episode-info-card");
    cardsContainer.appendChild(episodeInfoCard);

    // creating a episodeNameNumHolder for each episode as the first child of episodeInfoCard. This is the container for the holder of episode name, season and episode numbers.

    const episodeNameNumHolder = document.createElement("div");
    episodeNameNumHolder.classList.add("episode-name-num-holder");
    episodeInfoCard.appendChild(episodeNameNumHolder);

    // creating a episodeNameNumTextElement for each episode as a direct child of episodeNameNumHolder. This will hold the text info related to episode name, season and episode numbers.

    const episodeNameNumTextElement = document.createElement("h2");
    episodeNameNumTextElement.classList.add("episode-name-num-text");
    episodeNameNumHolder.appendChild(episodeNameNumTextElement);
    let formattedSeasonNum = ("0" + episodeList[i].season).slice(-2);
    let formattedEpisodeNum = ("0" + episodeList[i].number).slice(-2);
    episodeNameNumHolder.innerText = `${episodeList[i].name} - S${formattedSeasonNum}E${formattedEpisodeNum}`;

    // creating a episodeNameNumTextElement for each episode as the second child of episodeInfoCard. This will hold the image.

    const episodeImage = document.createElement("img");
    episodeImage.classList.add("medium-img");
    episodeInfoCard.appendChild(episodeImage);
    episodeImage.src = episodeList[i].image.medium;

    // creating episodeDescriptionTextContainer for each episode as the third child of episodeInfoCard. This will hold the episodeDescriptionTextElement.

    const episodeDescriptionTextContainer = document.createElement("div");
    episodeDescriptionTextContainer.classList.add("episode-description-container");
    episodeInfoCard.appendChild(episodeDescriptionTextContainer);

    // creating a episodeDescriptionTextElement for each episode inside the third child which is episodeDescriptionTextContainer. This will hold the episode description.

    const episodeDescriptionTextElement = document.createElement("p");
    episodeDescriptionTextElement.classList.add("episode-description");
    episodeDescriptionTextContainer.appendChild(episodeDescriptionTextElement);
    episodeDescriptionTextElement.innerText = episodeList[i].summary.slice(3,-4);
  }
}
