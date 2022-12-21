const express = require('express');
const router = express.Router();
const axios = require('axios');

const tmdb = "https://api.themoviedb.org/3/";
var mediaType = "";
var keyword = "";
const API = "?api_key=c1f7f5d00c378570cda732e7df5c39a6";
var lg = "&language=en-US";
var page = "&page=1";

const backdrop = "https://image.tmdb.org/t/p/original";

// Current Playing Movies JSON
router.get('/', function(req, res){
    mediaType = "movie/";
    keyword = "now_playing";
    let url = tmdb + mediaType + keyword + API + lg + page;
    axios.get(url).then(carousal => {
        var result = carousal.data.results;
        var usefulRes = new Array();
        for(var i = 0; i < 5; i++){
            var tmpDic = {};
            var tmpRes = result[i];
            tmpDic.type = "movie";
            tmpDic.id = tmpRes.id;
            tmpDic.title = tmpRes.original_title;
            tmpDic.backdrop = backdrop + tmpRes.backdrop_path;
            usefulRes.push(tmpDic);
        }

        res.json(usefulRes); 
    }).catch(err  => {
        console.log("Main Carousel Wrong :" + err);
        res.send(err)
    })
});

module.exports = router;