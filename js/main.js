//Variables
//Time between drinks (60 = normal, 100 = weak):
const dt = 10;
//length of playlist (100 = normal)
const pl = 100;
//Player related
var player = document.getElementById("player");
const playlistList = document.getElementById("playlist");
var playlistItems = document.getElementsByClassName("listItem");
//User playlist JSON related
var user_playlist = [];
var user_playlistOwner = "";
//Timer related
var currentItem = 0;
var playing = false;


//Kilian. Def the buttons
document.getElementById("button-updatePlaylist").addEventListener("click", click =>{
  updatePlaylist();
});
document.getElementById("button-playPlaylist").addEventListener("click", click =>{
  player.playVideo();
  playing = true;
  startTimer();
});
document.getElementById("button-pausePlaylist").addEventListener("click", click =>{
  player.pauseVideo();
  playing = false;
  pauseTimer();
});
document.getElementById("button-showCurrentID").addEventListener("click", click =>{
  console.log(user_playlist[currentItem].ID);
});
document.getElementById("button-loadItem").addEventListener("click", click =>{
  nextCurrentItem();
  loadItem();
});

//Kilian. This code loads the playlist json, then updates the playlist
fetch("playlist/data.json")
  .then(response =>{
    return response.json();
  }).then(obj =>{
    user_playlist = obj.playlist;
    user_playlistOwner = obj.owner;
  }).catch(error =>{
    console.error("Failed to load playlist JSON...")
    console.error(error)
  });

//Kilian. Make a new listitem in the "playlist" section
//Function accepts listitem objects (arrays)
function newListItem(item){
  //Create parts of object
  let li = document.createElement("li");
  let title = document.createElement("h3");
  let startTime = document.createElement("p");
  let endTime = document.createElement("p");
  let sound = document.createElement("i");
  //Give parts proporties
  li.classList.add("listItem");
  title.innerHTML = item.ID;
  startTime.innerHTML = "Start: " + item.startTime;
  endTime.innerHTML = "End: " + item.endTime;
  sound.innerHTML = item.sound;
  //Place parts on page
  li.appendChild(title);
  li.appendChild(startTime);
  li.appendChild(endTime);
  li.appendChild(sound);
  playlistList.appendChild(li);
}

//Kilian. this function updates a playlist item using the JSON
function updatePlaylistItem(item){
  playlistItems[item].children[0].innerHTML = user_playlist[item].ID;
  playlistItems[item].children[1].innerHTML = "Start: " + user_playlist[item].startTime.toString();
  playlistItems[item].children[2].innerHTML = "End: " + user_playlist[item].endTime.toString();
  playlistItems[item].children[3].innerHTML = user_playlist[item].sound;
}

//Kilian. this function updates the playlist
function updatePlaylist(){
  //Display owner of playlist on page
  document.getElementById("section-playlist").children[0].innerHTML = "Playlist van: " + user_playlistOwner;
  //Loop trough current playlist to change element details
  for(let i = 0; i < pl; i++){
    //replace current elements with JSON items
    if(i < playlistItems.length){
      updatePlaylistItem(i);
    }

    //Create new elements from JSON if not enough elements in current playlist
    if(i >= playlistItems.length && user_playlist.length > i){
      newListItem(user_playlist[i]);
    }

    //Remove acces elements if new list shorter

  }
}

function nextCurrentItem(){
  playlistList.children[currentItem].classList.remove("playing-item");
  currentItem = currentItem + 1;
  playlistList.children[currentItem].classList.add("playing-item");
}


//Kilian. Set timer
function setTimer(time){
  let timer = document.getElementById("timer");
  timer.setAttribute("data-time", time);
  timer.innerHTML = time;
}

//Kilian. Start timer
function startTimer(){
  let time = document.getElementById("timer").dataset.time;
  setInterval(timeFunction => {
    setTimer(time);
    time--;
    if(time < 0){
      time = dt;
      console.log("Toeter");
    }
  },1000);
}

//Kilian. Pause timer
function pauseTimer(){
}


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'fJ9rUzIMcZQ',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log("Done loading iFrame");
  //player.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
function onPlayerStateChange(event) {
  console.log("Player changed something!");
}

function stopVideo() {
  player.stopVideo();
}

function loadItem(){
  player.loadVideoById({'videoId': user_playlist[currentItem].ID,
               'startSeconds': user_playlist[currentItem].startTime,
               'endSeconds': user_playlist[currentItem].endTime});
}


/* Load the HTTP library
var http = require("http");

/* Create an HTTP server to handle responses

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(3000);
/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 *

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '75d8b84e3430468fbb7a8407da5373f0'; // Your client id
var client_secret = '5f3b3c803bca46588f72e7a5f829380f'; // Your secret
var redirect_uri = 'http://127.0.0.1:3000/'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 3000');
app.listen(3000);
**/
