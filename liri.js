var twitterData = require('./keys.js');
var spotifyData = require('spotify');
var request = require('request');
var inquirer = require('inquirer');

//var path = process.argv[2];

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

    if (argument.files === 'spotify-this-song') {

        spotifyData.search({
            type: 'track',
            query: 'baby one more time'
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

    if (argument.files === 'movie-this') {

        request.get("http://www.omdbapi.com/?t=frozen&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
            if (!error && response.statusCode == 200) {

                console.log(JSON.parse(body)["Title"]);

            }
        })


    }

})