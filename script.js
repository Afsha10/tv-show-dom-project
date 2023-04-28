//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  console.log(allEpisodes);
  makePageForEpisodes(allEpisodes);
}

/*
Pseudocode:
1. We are working with an episode list which is an array
  - create a container using JS connected to "#root"
  - we would need an H1 tag

2. For getting each episode we need access each element inside the array of objects.
3. For each movie element we would need to have name of the episodes, series and episode numbers, image of the episode and brief description of the movie
  - we would need h2, img, p (description) tag for each movie

*/



function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

