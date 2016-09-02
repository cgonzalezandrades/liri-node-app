var twitterData = require('./keys.js');
var spotifyData = require('spotify');
var inquirer = require('inquirer');

//var path = process.argv[2];

inquirer.prompt([
    {
        type: "list",
        message:'Select a command',
        choices:['my-tweets','spotify-this-song'],
        name: "files",
    }
    
    
    
]).then(function(argument) {
    

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
    
    if(argument.files === 'spotify-this-song'){
        
        console.log('i');
        
         spotifyData.search({type: 'track',query: 'baby one more time'}, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

//                        console.log(JSON.stringify(data.tracks.items[0], null, 2));
            console.log(JSON.stringify(data.tracks.items[0].name));


        });
        
        
    }
    

//    switch (path) {
//
//    case 'my-tweets':
//
//        twitterData.twitterKeys.get('statuses/user_timeline', {
//            count: 10
//        }, function (error, tweets, response) {
//            if (error) throw error;
//            //    console.log(JSON.stringify(tweets, null, 3));
//
//            //     console.log(tweets.length);
//
//
//            for (var i = 0; tweets.length > i; i++) {
//
//                console.log(tweets[i].text);
//                console.log('\n')
//
//            }
//
//        });
//
//        break;





        //switch (path) {
        //
        //case 'my-tweets':
        //
        //    twitterData.twitterKeys.get('statuses/user_timeline', {
        //        count: 10
        //    }, function (error, tweets, response) {
        //        if (error) throw error;
        //        //    console.log(JSON.stringify(tweets, null, 3));
        //
        //        //     console.log(tweets.length);
        //
        //
        //        for (var i = 0; tweets.length > i; i++) {
        //
        //            console.log(tweets[i].text);
        //            console.log('\n')
        //
        //        }
        //
        //    });
        //
        //    break;
//--------------
//    case 'spotify-this-song':
//        spotifyData.search({
//            type: 'track',
//            query: 'baby one more time'
//        }, function (err, data) {
//            if (err) {
//                console.log('Error occurred: ' + err);
//                return;
//            }
//
//            //            console.log(JSON.stringify(data.tracks.items[0], null, 2));
//            console.log(JSON.stringify(data.tracks.items[0].name));
//
//
//        });
//    
//    ---------
//        break;


//    }
})



//twitterData.twitterKeys.get(path, {
//    count: 10
//}, function (error, tweets, response) {
//    if (error) throw error;
//    //    console.log(JSON.stringify(tweets, null, 3));
//
//    //     console.log(tweets.length);
//
//
//    for (var i = 0; tweets.length > i; i++) {
//
//        console.log(tweets[i].text);
//        console.log('\n')
//
//    }
//
//});

//spotifyData.search({
//    type: 'track',
//    query: 'baby one more time'
//}, function (err, data) {
//    if (err) {
//        console.log('Error occurred: ' + err);
//        return;
//    }
//
//    //    console.log(JSON.stringify(data.tracks.items[0], null, 2));
//    //    console.log(JSON.stringify(data.tracks.items[0].name));
//
//
//});


//
//spotifyData.spotifyKeys.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 20 }, function(err, data) {
//  if (err) {
//    console.error('Something went wrong!');
//  } else {
//    console.log(data.body);
//  }
//});



//console.log(twitterData.twitterKeys.consumer_key);
//console.log(twitterData.twitterKeys.consumer_secret);