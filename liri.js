
// DOTENV
require("dotenv").config();
// REQUIRE METHODS
const request = require("request");
const keys = require("./keys"); // KEYS.JS FILE
let fs = require("fs"); // FILE SYSTEM
let Spotify = require("node-spotify-api"); // Spotify 
let OMDb = require('omdb'); // OMDb 
let Bands = require ('bandsintown');
    // possible bands in town code: 
        // let moment = require('moment');

//COMMAND AND INPUT FUNCTIONS
let args = process.argv.slice(2);
let command = args[0];
console.log(command);
let userInput = args.slice(1).join("+");

// PULLING KEYS TO SET UP CONSTRUCTOR 
let spotify = new Spotify(keys.spotify);




//SPOTIFY FUNCTION 
const spotifyThisSong= function(songName){
    // let songName; DOES NOT NEED TO BE DEFINED GLOBALLY 
    // LOAD SPOTIFY NPM PACKAGE (THIS HAS BEEN LOADED, 10-11-18)
    // const spotify = require('spotify'); USE SPOTIFY NODE PACKAGE 
    // REQUIRED DEFAULT SONG PER HOMEWORK INSTRUCTIONS
    if (songName === undefined) {
        songName = "The+Sign+Ace+of+Base";
    }
    console.log(songName);
    // SPOTIFY API REQUEST 
    spotify.search({ type: 'track', query: songName}, function(err, data){
        if(err) { 
            console.log("Uh oh! Error! :" + err);
        } else {
            for( let i = 0; i < data.tracks.items.length; i++){
            console.log("Song Name:  " + data.tracks.items[i].name);
            console.log("Preview Link  " + data.tracks.items[i].preview_url);
            console.log("Album:   " + data.tracks.items[i].album.name);
            }
        }
    });
}



// COMMAND CODES 
if (command === "spotify-this-song") {
	spotifyThisSong(userInput);
} else if (command === "movie-this") {
	movieThis();
} else if (command === "do-what-it-says") {
	fileSaysDo();
} else if (command === "do-what-it-says") {
	fileSaysDo();
} else {
	console.log("I'm sorry, I don't understand. Please tell me a command: \nmy-tweets \nspotify-this-song \nmovie-this \ndo-what-it-says");
}