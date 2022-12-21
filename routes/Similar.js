const express = require('express');
const router = express.Router();
const axios = require('axios');

const tmdb = "https://api.themoviedb.org/3/";
var mediaType = "";
var keyword = "";
const API = "?api_key=c1f7f5d00c378570cda732e7df5c39a6";
var lg = "&language=en-US";
var page = "&page=1";

const poster = "https://image.tmdb.org/t/p/w500";

router.get('/movie/:id', function (req, res) {
    mediaType = "movie/";
    keyword = "similar";
    id = req.params.id + "/";
    let url = tmdb + mediaType + id + keyword + API + lg + page;
    // console.log("Similar URL: " + url);

    axios.get(url).then(rec => {
        var result = rec.data.results;
        var usefulRes = new Array();
        for (var i = 0; i < result.length; i++) {
            var tmpDic = {};
            var tmpRes = result[i];
            if (tmpRes.poster_path) {
                tmpDic.type = "movie";
                tmpDic.id = tmpRes.id;
                tmpDic.title = tmpRes.title;
                tmpDic.poster = poster + tmpRes.poster_path;
                usefulRes.push(tmpDic);
            }
        }

        res.json(usefulRes);

    }).catch(err => {
        console.log("Cannot Get Similar: " + err);
        res.send(err)
    })
});

router.get('/tv/:id', function (req, res) {
    mediaType = "tv/";
    keyword = "similar";
    id = req.params.id + "/";
    let url = tmdb + mediaType + id + keyword + API + lg + page;
    // console.log("TV Similar URL: " + url);

    axios.get(url).then(rec => {
        var result = rec.data.results;
        var usefulRes = new Array();
        for (var i = 0; i < result.length; i++) {
            var tmpDic = {};
            var tmpRes = result[i];
            if (tmpRes.poster_path) {
                tmpDic.type = "tv";
                tmpDic.id = tmpRes.id;
                tmpDic.title = tmpRes.name;
                tmpDic.poster = poster + tmpRes.poster_path;
                usefulRes.push(tmpDic);
            }
        }

        res.json(usefulRes);

    }).catch(err => {
        console.log("Cannot Get Similar: " + err);
        res.send(err)
    })
});

module.exports = router;