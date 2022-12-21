const express = require('express');
const router = express.Router();
const axios = require('axios');

const tmdb = "https://api.themoviedb.org/3/";
var mediaType = "";
var keyword = "";
const API = "?api_key=c1f7f5d00c378570cda732e7df5c39a6";
var lg = "&language=en-US";
var page = "&page=";

const poster = "https://image.tmdb.org/t/p/w500";

// get data for carousel Movies JSON
router.get('/tv/:operationT', function (req, res) {
    mediaType = "tv/";
    keyword = req.params.operationT;
    pageNum = 1;
    let url;
    if (keyword != "day") {
        url = tmdb + mediaType + keyword + API + lg;
    } else {
        url = tmdb + "trending/" + mediaType + keyword + API;
    }

    axios.get(url + page + pageNum).then(resData => {

        var result = resData.data.results;
        var usefulRes = [];
        var resNum = 0;

        for (var i = 0; i < result.length; i++) {
            var tmpDic = {};
            var tmpRes = result[i];
            if (tmpRes.poster_path != null) {
                tmpDic.id = tmpRes.id;
                tmpDic.title = tmpRes.original_name;
                tmpDic.type = "tv";
                tmpDic.poster = poster + tmpRes.poster_path;
                usefulRes.push(tmpDic);
                resNum++;
            }

        }
        res.json(usefulRes);
    }).catch(err => {
        console.log("Get Commen Carousel TV Went Wrong: " + err);
        res.send(err)
    })

});

router.get('/movie/:operationT', function (req, res) {
    mediaType = "movie/";
    keyword = req.params.operationT;
    pageNum = 1;
    let url;
    if (keyword != "day") {
        url = tmdb + mediaType + keyword + API + lg;
    } else {
        url = tmdb + "trending/" + mediaType + keyword + API;
    }

    //console.log(url);
    axios.get(url + page + pageNum).then(resData => {

        var result = resData.data.results;
        var usefulRes = [];
        var resNum = 0;

        for (var i = 0; i < result.length; i++) {
            var tmpDic = {};
            var tmpRes = result[i];
            if (tmpRes.poster_path != null) {
                tmpDic.id = tmpRes.id;

                tmpDic.title = tmpRes.original_title;
                tmpDic.type = "movie";
                tmpDic.poster = poster + tmpRes.poster_path;
                usefulRes.push(tmpDic);
                resNum++;
            }

        }
        res.json(usefulRes);
    }).catch(err => {
        console.log("Get Commen Carousel Movie Went Wrong: " + err);
        res.send(err)
    })

});

module.exports = router;