// DOTENV
require("dotenv").config();
// REQUIRED REQUESTS
const request = require("request");
const keys = require("./keys"); // KEYS.JS FILE
const moment = require("moment");// BANDS IN TOWN 
let fs = require("fs"); // FILE SYSTEM
let Spotify = require("node-spotify-api"); // Spotify 
let OMDb = require('request'); // OMDb 
let Bands = require('bandsintown');

//COMMAND AND INPUT FUNCTIONS
let args = process.argv.slice(2);
let command = args[0];
// console.log(command);
let userInput = args.slice(1).join("+");

// PULLING KEYS TO SET UP CONSTRUCTOR 
let spotify = new Spotify(keys.spotify);
let omdbKey = keys.omdb;
let bands = keys.bands;
console.log(userInput)


//SPOTIFY FUNCTION 
const spotifyThisSong = (songName) => {
    console.log(typeof songName)

    // REQUIRED DEFAULT SONG PER HOMEWORK INSTRUCTIONS
    if (songName === "") {
        songName = "The+Sign+Ace+of+Base";
    }
    console.log(songName);
    // SPOTIFY API REQUEST 
    spotify.search({ type: 'track', query: songName }, function (error, data) {
        if (error) {
            return console.log("Uh oh! Error! :" + error);
        } else {
            for (let i = 0; i < data.tracks.items.length; i++) {
                console.log("Artist Name:   " + data.tracks.items[i].album.artists[0].name); // FIGURE OUT!
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
    if (mov === "") {
        mov = 'Baby+Driver';
    }
    let search = "http://www.omdbapi.com/?apikey=" + keys.omdb.id + "&t=" + mov + "&plot=short";
    // SEARCH 
    request(search, function (err, res, body) {
        if (err) {
            console.log("Uh Oh! Error!: " + err);
            return;
        } else {
            let data = JSON.parse(body);
            console.log(data)
            console.log("\n-------------------------------------------------------------\n \tMovie Info  \n-------------------------------------------------------------\n");
            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("County of Production: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log("\n-------------------------------------------------------------\n");
        }
    });
}

// BANDS IN TOWN FUNCTION 
let BandsIT = (band) => {
    //DEFAULT BAND
    if (band === "") {
        band = 'Chance+The+Rapper';
    }
    // SEARCH 
    let search = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=" + '3c5eb98e695dc304f85847f7a803873b';
    //REQUEST TO BANDS IN TOWN API
    request(search, function (err, res, body) {
        if (err) {
            console.log("Uh Oh! Error! " + err);
            return;
        } else {
            let data = JSON.parse(body);
            console.log("\n-------------------------------------------------------------\n \t Concert \"" + band + "\" Info  \n-------------------------------------------------------------\n");
            for (let i = 0; i < data.length; i++) {
                console.log("-------------------------------------------------------------\n");
                console.log("Venue: " + data[i].venue.name);
                console.log("Location: " + data[i].venue.city);
                let startTm = data[i].datetime;
                let date = moment(startTm).format('MMMM Do YYYY, h:mm:ss a');
                console.log("Date of Concert: " + date);
                console.log("\n-------------------------------------------------------------\n");
            }
        }
    });
};

//DO WHAT IT SAYS FUNCTION 
const fileSaysDo = () => {
    fs.readFile('random.txt', function (err, data) {
        if (err) {
            console.log("Uh Oh! Error!: " + err);
        }
        let text = data.toString();

        data = text.split(",");

        command = data[0].trim();
        let search = data[1].trim();
        console.log(search);
        console.log(command);

        // LOOP FOR WHAT IT SAYS FUNCTION 
        if (command === "spotify-this-song") {
            spotifyThisSong(search);
        } else if (command === "movie-this") {
            movieThis(search);
        } else if (command === "concert-this") {
            BandsIT(search);
        } else {
            console.log("I'm sorry, I don't understand. Please tell me a command:\nspotify-this-song \nmovie-this \ndo-what-it-says \nconcert-this");
        }
    });

}

// COMMAND LOOP
if (command === "spotify-this-song") {
    console.log("This is working")
    spotifyThisSong(userInput);
} else if (command === "movie-this") {
    movieThis(userInput);
} else if (command === "do-what-it-says") {
    fileSaysDo();
    console.log("testing");
} else if (command === "concert-this") {
    BandsIT(userInput);
} else {
    console.log("I'm sorry, I don't understand. Please tell me a command:\nspotify-this-song \nmovie-this \ndo-what-it-says \nconcert-this");
}