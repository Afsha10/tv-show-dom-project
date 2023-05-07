You can edit ALL of the code here

Pseudocode for level 100:

1. We are working with an episode list which is an array

- create a container using JS connected to "#root"
- we might need an H1 tag
- we create a draft of our web page using HTML and CSS
- we then convert the HTML elements to JS by creating variables and append them inside the other according to our HTML tree layout as below

  <input id="search-input"/>
  <span class="search-result-info">Displaying<span class="serach-count">searchCountEle</span>/73 episodes</span>
  <div id="root">
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

Create option element for each episode

1. We created an option element for each episode
2. We updated option value attribute with setAttribute
3. We updated option text with textContent
4. Append optionHTML inside SelectHTML

Pinned header to the top of the site.

1. Change header position to fixed
2. Added a top value of 0
3. updated background-color.

4. If the value attribute from optionHTML

Create scroll to card functionality

1. Check value attribute from optionHTML is included (.includes) in episodeNameNumElement.textContent
2. If value is included then find episodeNameNumElement and save to variable
3. use variable.scrollIntoView({behaviour: smooth}) to scroll down to card.

alternative:

[Set Attribute](<https://www.javatpoint.com/javascript-setattribute#:~:text=%E2%86%92%20%E2%86%90%20prev-,JavaScript%20setAttribute(),update%20the%20existing%20attribute's%20value.>)

To display the selected episode we will need to apply a filtering logic based on the value obtained from the change event listener, instead of just using console.log and printing out the selected episode's value.

const optionValue = `S${episodeName} - S${seasonNum}E${episodeNum}`; <= Same as episodeNameNumElement
const optionText = `S${seasonNum}E${episodeNum} - ${episodeName}`;
