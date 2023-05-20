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
