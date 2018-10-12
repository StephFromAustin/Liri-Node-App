// CODE REQUIRED FOR FILE SYSTEM
const fs = required('fs');
const request = require('request');
let Spotify = require('node-spotify-api');

// CODE READS AND SETS ANY ENVIROMENT VARIABLES WITH THE dotenv PACKAGE. 
require("dotenv").config();

//CODE REQUIRED TO IMPORT THE keys.js FILE AND SOTRE IT IN A VARIABLE. 
    // "./keys" IS THE BETTER WAY TO LOOK FOR IT BECAUSE .JS IS REDUNDANT 
let keys = require("./keys");
// let spotify =  require("node-spotify-api"); => needs to be within the SPOTIFY function, delete before final master push 

// COMMAND AND INPUT FUNCTION 
let command = process.argv[2]; 
let input = process.argv[3];

//SPOTIFY FUNCTION: make it so liri.js can take inone of the follow commands: (spotify) => spotify-this-song

// PULLING KEYS TO SET UP CONSTRUCTOR 
let spotify = new Spotify(keys.spotify);

//SPOTIFY FUNCTION 
let spotifyThisSong= function(songName){
    // LOAD SPOTIFY NPM PACKAGE (LOADED!!!)
    let spotify = require('spotify');
    // REQUIRED DEFAULT 
    if (songName === undefined) {
        songName = "The Sign Ace of Base";
    }

    // SPOTIFY SEARCH 
    // spotify.search 

}