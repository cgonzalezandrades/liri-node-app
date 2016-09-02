var twitterData = require('./keys.js');
var spotifyData = require('spotify');
var request = require('request');
var inquirer = require('inquirer');
var fs = require('fs');
var passingData = false;


console.log("");
inquirer.prompt([
    {
        type: "list",
        message: 'Select a command',
        choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
        name: "files",
    }

]).then(function (argument) {

    if (argument.files === 'my-tweets') {
        selectTweets();

    }

    if (argument.files === 'spotify-this-song') {
        selectSong(null, passingData);

    }

    if (argument.files === 'movie-this') {
        selectMovie(null, passingData);

    }

    if (argument.files === 'do-what-it-says') {

        fs.readFile("random.txt", "utf8", function (error, data) {
            //            console.log(data);

            var dataArr = data.split(',');

            switch (dataArr[0]) {

            case 'my-tweets':
                selectTweets();
                break;

            case 'spotify-this-song':
                passingData = true;
                selectSong(dataArr[1], passingData);
                break;

            case 'movie-this':

                passingData = true;
                selectMovie(dataArr[1], passingData)
                break;

            }
        });
    }

    function selectTweets() {

        twitterData.twitterKeys.get('statuses/user_timeline', {
            count: 10
        }, function (error, tweets, response) {
            if (error) throw error;

            //    console.log(JSON.stringify(tweets, null, 3));

            //     console.log(tweets.length);

            for (var i = 0; tweets.length > i; i++) {
                console.log(tweets[i].text);
                console.log('\n')
            }
        });
    }

    function selectSong(passedSong, passingData) {

        if (passingData === false) {

            inquirer.prompt([

                {
                    type: "input",
                    message: 'Select a song data',
                    name: "songName",
                }

]).then(function (song) {

                spotifyData.search({
                    type: 'track',
                    query: song.songName,
                }, function (err, data) {
                    if (err) {
                        console.log('Error occurred: ' + err);
                        return;
                    }

                    //            console.log(JSON.stringify(data.tracks.items[0], null, 2));
                    //            console.log(JSON.stringify(data.tracks.items[0].name));
                    console.log("");
                    console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
                    console.log("Song Title: " + data.tracks.items[0].name);
                    console.log("Song Preview: " + data.tracks.items[0].preview_url);
                    console.log("Song Album: " + data.tracks.items[0].album.name);
                    console.log("");
                });
            })
        } else {

            spotifyData.search({
                type: 'track',
                query: passedSong,
            }, function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }

                //            console.log(JSON.stringify(data.tracks.items[0], null, 2));
                //            console.log(JSON.stringify(data.tracks.items[0].name));

                console.log("");
                console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
                console.log("Song Title: " + data.tracks.items[0].name);
                console.log("Song Preview: " + data.tracks.items[0].preview_url);
                console.log("Song Album: " + data.tracks.items[0].album.name);
                console.log("");

            });
        }
    }

    function selectMovie(passingMovieName, passingData) {

        if (passingData === false) {
            console.log("");
            inquirer.prompt([
                {
                    type: "input",
                    message: 'Select a Movie',
                    name: "movieName",
    }

]).then(function (movie) {
                request.get("http://www.omdbapi.com/?t=" + movie.movieName + "+&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        console.log("Movie Name:-------- " + JSON.parse(body)["Title"] + "\n");

                        console.log("Movie Year: " + JSON.parse(body)["Year"] + "\n");

                        console.log("Movie imdbRating: " + JSON.parse(body)["imdbRating"] + "\n");

                        console.log("This movie was produce in: " + JSON.parse(body)["Country"] + "\n");

                        console.log("Movie Language:  " + JSON.parse(body)["Language"] + "\n");

                        console.log("Plot:  " + JSON.parse(body)["Plot"] + "\n");

                        console.log("Actors:  " + JSON.parse(body)["Actors"] + "\n");

                        console.log("Rotten Tomato Rating:  " + JSON.parse(body)["tomatoRating"] + "\n");

                        console.log("Rotten Tomato URL:  " + JSON.parse(body)["tomatoURL"] + "\n");
                    }
                })
            })
            
        }else{
            request.get("http://www.omdbapi.com/?t=" + passingMovieName + "+&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    console.log("Movie Name:-------- " + JSON.parse(body)["Title"] + "\n");

                    console.log("Movie Year: " + JSON.parse(body)["Year"] + "\n");

                    console.log("Movie imdbRating: " + JSON.parse(body)["imdbRating"] + "\n");

                    console.log("This movie was produce in: " + JSON.parse(body)["Country"] + "\n");

                    console.log("Movie Language:  " + JSON.parse(body)["Language"] + "\n");

                    console.log("Plot:  " + JSON.parse(body)["Plot"] + "\n");

                    console.log("Actors:  " + JSON.parse(body)["Actors"] + "\n");

                    console.log("Rotten Tomato Rating:  " + JSON.parse(body)["tomatoRating"] + "\n");

                    console.log("Rotten Tomato URL:  " + JSON.parse(body)["tomatoURL"] + "\n");

                }
            })
        }
    }
})