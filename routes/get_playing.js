const express = require('express');
const router = express.Router();
const axios = require('axios');

const key = "c1f7f5d00c378570cda732e7df5c39a6";
const ori_image = "https://image.tmdb.org/t/p/original";

// 10 Current Playing TV shows
router.get('/tv', function(req, res){
    let url = "https://api.themoviedb.org/3/tv/airing_today?api_key=" + key + "&language=en-US&page=1";
    axios.get(url).then(carousal => {
        var result = carousal.data.results;
        var ret = new Array();
        for(var i = 0; i < 5; i++){
            var newObj = {};
            var currRes = result[i];
            newObj.type = "tv";
            newObj.id = currRes.id;
            newObj.title = currRes.name;
            newObj.backdrop = ori_image + currRes.poster_path;
            ret.push(newObj);
        }

        res.json(ret); 
    }).catch(err  => {
        console.log("Cannot get now playing tv:\n" + err);
        res.send(err)
    })
});

// 10 Current Playing Movies
router.get('/*', function(req, res){
    let url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + key + "&language=en-US&page=1";
    axios.get(url).then(carousal => {
        var result = carousal.data.results;
        var ret = [];
        for(var i = 0; i < 10; i++){
            var newObj = {};
            var currRes = result[i];
            newObj.type = "movie";
            newObj.id = currRes.id;
            newObj.title = currRes.original_title;
            newObj.backdrop = ori_image + currRes.backdrop_path;
            ret.push(newObj);
        }
        res.json(ret); 
    }).catch(err  => {
        console.log("Cannot get now playing movies:\n" + err);
        res.send(err)
    })
});

module.exports = router;