// ----
// DATA
// ----

// A couple jokes to start with

var jokes = {}

var jokestored = window.localStorage.getItem('jokestorage')

if (!jokestored) {
  jokes['the horse'] = {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  }
  jokes['Orion\'s pants'] = {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
  var stringifyJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokestorage', stringifyJokes)
} else {
  jokes = JSON.parse(jokestored)
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var displayJoke = jokes[requestedJokeKey]
  if (displayJoke) {
    jokeBox.innerHTML = '<p>' + displayJoke.setup + '</p>' +
    '<p>' + displayJoke.punchline + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

var addition = document.getElementById('remember')
var addJoke = function () {
  var label = document.getElementById('title').value
  var start = document.getElementById('setup').value
  var end = document.getElementById('end').value
  if (!label || !start || !end) {
    window.alert("joke isn't completed")
  } else {
    jokes[label] = {
      setup: start, punchline: end
    }
    var stringifyJokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokestorage', stringifyJokes)
    updatePage()
  }
}

var goingToBeDeleted = document.getElementById('forget')
var deleteJoke = function () {
  var getRidOf = document.getElementById('dislike').value
  if (getRidOf in jokes) {
    delete jokes[getRidOf]
    var stringifyJokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokestorage', stringifyJokes)
  } else {
    window.alert('joke not found')
  }
  updatePage()
}
// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
addition.addEventListener('click', addJoke)
goingToBeDeleted.addEventListener('click', deleteJoke)
