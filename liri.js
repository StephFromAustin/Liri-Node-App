// CODE REQUIRED FOR FILE SYSTEM
const fs = require('fs');
// CONST TO REQUIRE REQUEST 
const request = require('request');
// REQUIRE FOR ALL SYSTEMS USED IN APP: add omdb and bandsintown
let Spotify = require('node-spotify-api');

// CODE READS AND SETS ANY ENVIROMENT VARIABLES WITH THE dotenv PACKAGE. 
require("dotenv").config();

//CODE REQUIRED TO IMPORT THE keys.js FILE AND SOTRE IT IN A VARIABLE. 
    // "./keys" IS THE BETTER WAY TO LOOK FOR IT BECAUSE .JS IS REDUNDANT 
let keys = require("./keys");


// COMMAND AND INPUT FUNCTION 
let command = process.argv[2]; 
let input = process.argv[3];


// PULLING KEYS TO SET UP CONSTRUCTOR 
let spotify = new Spotify(keys.spotify);

// FUNCTION TO RUN LIRI 



//SPOTIFY FUNCTION 
let spotifyThisSong= function(songName){
    // LOAD SPOTIFY NPM PACKAGE (LOADED!!!)
    let spotify = require('spotify');
    // REQUIRED DEFAULT SONG PER HOMEWORK INSTRUCTIONS
    if (songName === undefined) {
        songName = "The Sign Ace of Base";
    }
    // SPOTIFY API REQUEST 
    spotify.search({ type: 'song', query: songName}, function(err, data){
        if(err) { 
            console.log("An error has occured:" + err);
        } else {
            for( let i = 0; i < data.songs.items[0] .artist.length; i++){
                if (i === 0){
                    console.log("Artist:" + data.songs.items[0].artist[i].name);
                }else {
                    console.log("" + data.songs.items[0].artist[i].name);
                }
            }
            console.log("Song Name:  " + data.songs.items[0].name);
            console.log("Preview Link  " + data.songs.items[0].preview_url);
            console.log("Album:   " + data.songs.items[0].album.name);
            console.log(output);
           writeToLog(output);
        }
    });



}