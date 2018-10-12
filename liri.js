
// DOTENV
require("dotenv").config();
// REQUIRE METHODS
let request = require("request");
let keys = require("./keys"); // KEYS.JS FILE
let fs = require("fs"); // FILE SYSTEM
let Spotify = require("node-spotify-api"); // Spotify 
let OMDb = require('omdb'); // OMDb 
let Bands = require ('bandsintown');
    // possible bands in town code: 
        // let moment = require('moment');

//COMMAND AND INPUT FUNCTIONS
let args = process.argv.slice(2);
let command = args[0];
let userInput = args.slice(1).join(" ");

// PULLING KEYS TO SET UP CONSTRUCTOR 
let spotify = new Spotify(keys.spotify);

// COMMAND CODES 
if (command === "spotify-this-song") {
	spotifyThisSong();
} else if (command === "movie-this") {
	movieThis();
} else if (command === "do-what-it-says") {
	fileSaysDo();
} else if (command === "do-what-it-says") {
	fileSaysDo();
} else {
	console.log("I'm sorry, I don't understand. Please tell me a command: \nmy-tweets \nspotify-this-song \nmovie-this \ndo-what-it-says");
}

//SPOTIFY FUNCTION 
let spotifyThisSong= function(songName){
    // LOAD SPOTIFY NPM PACKAGE (THIS HAS BEEN LOADED, 10-11-18)
    let spotify = require('spotify');
    // REQUIRED DEFAULT SONG PER HOMEWORK INSTRUCTIONS
    if (songName === undefined) {
        songName = "The Sign Ace of Base";
    }
    // SPOTIFY API REQUEST 
    spotify.search({ type: 'song', query: songName}, function(err, data){
        if(err) { 
            console.log("Uh oh! Error! :" + err);
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
    


// OMDb FUNCTION 
function movieThis() {
// 	let isInputNull = userInput === "" ? userInput = "Spaceballs" : userInput = userInput;
// 	let queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + userInput

// 	request(queryUrl, function(err, response, body) {
// 		if (err) {
// 			return console.log(err);
// 		} else {
// 			var rottenExists = JSON.parse(body).Ratings[1] === undefined ? rottenExists = "N/A" : rottenExists = JSON.parse(body).Ratings[1].Value;
// 			console.log("Title: " + JSON.parse(body).Title);
// 			console.log("Year: " + JSON.parse(body).Year);
// 			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
// 			console.log("Rotten Tomatoes Rating: " + rottenExists);
// 			console.log("Country: " + JSON.parse(body).Country);
// 			console.log("Language: " + JSON.parse(body).Language);
// 			console.log("Plot: " + JSON.parse(body).Plot);
// 			console.log("Actors: " + JSON.parse(body).Actors);	
// 		}

// 		fs.appendFile("log.txt", "\n" + "Appending this movie information: " + 
// 			"\n" + JSON.parse(body).Title + "\n" + JSON.parse(body).Year + 
// 			"\n" + JSON.parse(body).imdbRating + "\n" + JSON.parse(body).rottenExists +
// 			"\n" + JSON.parse(body).Country + "\n" + JSON.parse(body).Language +
// 			"\n" + JSON.parse(body).Plot + "\n" + JSON.parse(body).Actors, function(err) {
// 				if (err) {
// 					console.log(err);
// 				}
// 			})
// 	})
// }

// DO WHAT IT SAYS FUNCTION 
function fileSaysDo() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		} else {
			let dataArr = data.split(",");
			userInput = dataArr[1];
			command = dataArr[0];

			if (command === "my-tweets") {
				tweetTweet();
			} else if (command === "spotify-this-song") {
				spotifyThis();
			} else {
				movieThis();
			}
		}

		fs.appendFile("log.txt", "User engaged the random file.", function(err) {
			if (err) {
				console.log(err);
			}
        })
        
    };
}