// DOTENV
require("dotenv").config();
// REQUIRE METHODS
const request = require("request");
const keys = require("./keys"); // KEYS.JS FILE
let fs = require("fs"); // FILE SYSTEM
let Spotify = require("node-spotify-api"); // Spotify 
let OMDb = require('request'); // OMDb 
let Bands = require ('bandsintown');
    // possible bands in town code: 
        // let moment = require('moment');

//COMMAND AND INPUT FUNCTIONS
let args = process.argv.slice(2);
let command = args[0];
// console.log(command);
let userInput = args.slice(1).join("+");

// PULLING KEYS TO SET UP CONSTRUCTOR 
let spotify = new Spotify(keys.spotify);
let omdbKey = keys.omdb;
let bands = keys.bands;


// TRYING TO GET SPOTIFY TO WORK 
// var spotify = new Spotify({
//     id: keys.spotify.id,
//     secret: <your spotify client secret>
//   });
   
//   spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });


//SPOTIFY FUNCTION 
const spotifyThisSong= function(songName){
    // let songName; DOES NOT NEED TO BE DEFINED GLOBALLY 
    // LOAD SPOTIFY NPM PACKAGE (THIS HAS BEEN LOADED, 10-11-18)
    // const spotify = require('spotify'); USE SPOTIFY NODE PACKAGE 
    // REQUIRED DEFAULT SONG PER HOMEWORK INSTRUCTIONS
    if (songName === undefined) {
        songName = "The+Sign+Ace+of+Base";
    }
    // SPOTIFY API REQUEST 
    spotify.search({ type: 'track', query: songName}, function(error, data){
        if(error) { 
            return console.log("Uh oh! Error! :" + error);
        } else {
            for( let i = 0; i < data.tracks.items.length; i++){
            // console.log("Artist Name:   " + data.tracks.items[i].album.artist); // FIGURE OUT!
            console.log("Song Name:  " + data.tracks.items[i].name);
            console.log("Preview Link  " + data.tracks.items[i].preview_url);
            console.log("Album:   " + data.tracks.items[i].album.name);
            }
        }
    });
}

//OMDb FUNCTION 
let movieThis = (mov) => {
    // DEFAULT MOVIE 
    if (mov === 'undefined') {
        mov = 'Baby Driver';
    }
    let search = "http://www.omdbapi.com/?apikey=" + keys.omdb.id+ "&t=" + mov + "&plot=short";
    // let newSearch = `http://www.omdbapi.com/?apikey=${omdbKey.key}&s=${mov}`

    request(search, function (err, res, body) {
        if (err) {
            console.log("Uh Oh! Error!: " + err);
            return;
        } else {
            let data = JSON.parse(body);
            console.log(body)
            // console.log("\n-------------------------------------------------------------\n \tMovie Info  \n-------------------------------------------------------------\n");
            // console.log("Title: ") + data.Title;
            // console.log("Year: ") + data.Year;
            // console.log("IMDB Rating: ") + data.imdbRating;
            // console.log("Rotten Tomatoes Rating: ") + data.Ratings[1].Value;
            // console.log("County of Production: ") + data.Country;
            // console.log("Language: ") + data.Language;
            // console.log("Plot: ") + data.Plot;
            // console.log("Actors: ") + data.Actors;
            // console.log("\n-------------------------------------------------------------\n");
        }
    });
}



// BANDS IN TOWN FUNCTION 
let BandEvnt = (band) => {
    //DEFAULT BAND
    if (band === 'undefined') {
        band = 'Chance+The+Rapper';
    }
    let search = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=" + bands.id;
    //request to the BandsInTown API
    request(search, function (err, res, body) {
        if (err) {
            console.log("Uh Oh! Error! " + err);
            return;
        } else {
            let data = JSON.parse(body);
            console.log("\n-------------------------------------------------------------\n \t Concert \"" + band + "\" Info  \n-------------------------------------------------------------\n");
            for (let i = 0; i < data.length; i++) {
                console.log("-------------------------------------------------------------\n");
                console.log("Venue: ") + data[i].venue.name;
                console.log("Location: ") + data[i].venue.city;
                    let startTm = data[i].datetime;
                    let date = moment(startTm).format('MMMM Do YYYY, h:mm:ss a');
                console.log("Date of Concert: ") + date;
                console.log("\n-------------------------------------------------------------\n");
            }
        }
    });
};

//DO WHAT IT SAYS FUNCTION 
const fileSaysDo = () => {
    fs.readFile("random.txt", (err, data) =>{
        if(err){
            console.log("Uh Oh! Error!: " + err);
        }
        let text = data.toString();
        data = text.split(",");
        let command = data[0].trim();
        let search = data[1].trim();
    });


    // COMMAND CODES -- needs be 
if (command === "spotify-this-song") {
    spotifyThisSong(userInput);
} else if (command === "movie-this") {
    movieThis(userInput);
} else if (command === "do-what-it-says") {
	fileSaysDo();
} else if (command === "do-what-it-says") {
	fileSaysDo();
} else {
	console.log("I'm sorry, I don't understand. Please tell me a command:\nspotify-this-song \nmovie-this \ndo-what-it-says");
}
}

fileSaysDo()