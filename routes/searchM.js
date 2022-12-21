const express = require('express');
const router = express.Router();
const axios = require('axios');

const tmdb = "https://api.themoviedb.org/3/";
const API = "?api_key=c1f7f5d00c378570cda732e7df5c39a6";
var lg = "&language=en-US";
var mediaType = "multi";
var keyword = "search/";

const backdrop = "https://image.tmdb.org/t/p/w500";

// Search Multi
router.get('/:title', function (req, res) {

    var page = "&page=";
    var quiry = "&query=" + req.params.title;
    let url = tmdb + keyword + mediaType + API + lg + quiry;
    // console.log(url);
    axios.get(url).then(searchRes => {

        //var currPage = 1;

        var total_result = searchRes.data.total_result;
        var results = searchRes.data.results;
        var total_pages = searchRes.data.total_pages;

        var resNum = 0;
        var usefulRes = new Array();
        if (total_result != 0) {
            for (var i = 0; i < results.length; i++) {
                var tmpDic = {}
                var tmpMovie = results[i];
                if (tmpMovie.media_type != "person" && tmpMovie.backdrop_path != null) {
                    tmpDic.media_type = tmpMovie.media_type;
                    tmpDic.id = tmpMovie.id;
                    tmpDic.type = tmpMovie.media_type;
                    if (tmpMovie.media_type == "movie") {
                        tmpDic.title = tmpMovie.original_title;
                    } else {
                        tmpDic.title = tmpMovie.original_name;
                    }
                    tmpDic.backdrop = backdrop + tmpMovie.backdrop_path;
                    usefulRes.push(tmpDic);
                    resNum++;
                }
                if (resNum == 7) {
                    break;
                }
            }
        }

        if (resNum < 7 && total_pages > 1) {
            if (total_pages > 5) { total_pages = 5 }
            var jointResults = [];
            var promises = [];
            for (var i = 2; i < total_pages; i++) {
                promises.push(
                    axios.get(url + page + i).then(newRes => {
                        var tmpRes = newRes.data.results;
                        jointResults = jointResults.concat(tmpRes);
                    })
                )
            }
            Promise.all(promises).then(() => {
                for (var i = 0; i < jointResults.length; i++) {
                    var tmpDic = {};
                    var tmpMovie = jointResults[i];
                    if (tmpMovie.media_type != "person" && tmpMovie.backdrop_path != null) {
                        tmpDic.id = tmpMovie.id;
                        tmpDic.type = tmpMovie.media_type;
                        if (tmpMovie.media_type == "movie") {
                            tmpDic.title = tmpMovie.original_title;
                        } else {
                            tmpDic.title = tmpMovie.original_name;
                        }
                        tmpDic.backdrop = backdrop + tmpMovie.backdrop_path;
                        usefulRes.push(tmpDic);
                        resNum++;
                    }
                    if (resNum > 7) {
                        break;
                    }
                }

                res.json(usefulRes);
            });
        } else {
            res.json(usefulRes);
        }

    }).catch(err => {
        console.log("somthing went wrong");
        res.send(err)
    })
});

module.exports = router;