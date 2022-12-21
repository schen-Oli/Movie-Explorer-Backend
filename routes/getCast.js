const express = require('express');
const router = express.Router();
const axios = require('axios');

const tmdb = "https://api.themoviedb.org/3/";
var mediaType = "";
var id = "";
const API = "?api_key=c1f7f5d00c378570cda732e7df5c39a6";
var lg = "&language=en-US";
var page = "&page=1";
var keyword = "credits";

router.get('/movie/:id', function (req, res) {
    mediaType = "movie/";
    id = req.params.id + "/";
    let url = tmdb + mediaType + id + keyword + API + lg + page;
    //console.log(url);
    axios.get(url).then(responde => {
        var result = responde.data.cast;
        var usefulRes = [];
        for (var i = 0; i < result.length; i++) {
            var tmpRes = result[i];
            if (tmpRes.profile_path) {
                var tmpDic = {};
                tmpDic.name = tmpRes.name;
                tmpDic.id = tmpRes.id;
                tmpDic.character = tmpRes.character;
                tmpDic.profile = "https://image.tmdb.org/t/p/w500" + tmpRes.profile_path;
                usefulRes.push(tmpDic);
            }
        }
        res.send(usefulRes);
    }).catch(err => {
        console.log("Get Movie Cast Goes Wrong: " + err);
        res.send(err);
    })
});

router.get('/tv/:id', function (req, res) {
    mediaType = "tv/";
    id = req.params.id + "/";
    let url = tmdb + mediaType + id + keyword + API + lg + page;
    // console.log("Tv GetCast: "+url);
    axios.get(url).then(responde => {
        var result = responde.data.cast;
        var usefulRes = [];
        for (var i = 0; i < result.length; i++) {
            var tmpRes = result[i];
            if (tmpRes.profile_path) {
                var tmpDic = {};
                tmpDic.name = tmpRes.name;
                tmpDic.id = tmpRes.id;
                tmpDic.character = tmpRes.character;
                tmpDic.profile = "https://image.tmdb.org/t/p/w500" + tmpRes.profile_path;
                usefulRes.push(tmpDic);
            }
        }
        res.send(usefulRes);
    }).catch(err => {
        console.log("TV GetCast Went Wrong: " + err);
        res.send(err);
    })
});

module.exports = router;