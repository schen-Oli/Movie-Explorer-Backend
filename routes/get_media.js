const express = require('express');
const router = express.Router();
const axios = require('axios');

function addDataToArray(arr, type, data) {
    for (var i = 0; i < data.length; i++) {
        var newObj = {};
        var currData = data[i];
        if (currData.poster_path != null) {
            newObj.id = currData.id;
            newObj.title = type == "movie" ? currData.original_title : currData.original_name;
            newObj.type = type == "movie" ? "movie" : "tv";
            newObj.poster = "https://image.tmdb.org/t/p/w500" + currData.poster_path;
            arr.push(newObj);
        }
    }
}

// get trending / popular / top rated media
router.get('/:mediaType/:operationType', function (req, res) {
    let mediaType = req.params.mediaType;
    let keyword = req.params.operationType;
    let pageNum = 1;

    if(keyword == "trending"){
        keyword = mediaType == "movie" ? "upcoming" : "on_the_air";
    }

    let url = "https://api.themoviedb.org/3/"
        + (mediaType == "movie" ? "movie/" : "tv/")
        + keyword
        + "?api_key=c1f7f5d00c378570cda732e7df5c39a6&language=en-US&page=";

    axios.all([
        axios.get(url + pageNum),
        axios.get(url + (pageNum + 1))
    ]).then(
        axios.spread((data1, data2) => {
            data1 = data1.data.results;
            data2 = data2.data.results;

            var ret = [];
            
            addDataToArray(ret, mediaType, data1);
            addDataToArray(ret, mediaType, data2);

            res.json(ret);
        })
    ).catch(err => {
        console.log("Get Commen Carousel TV Went Wrong: " + err);
        res.send(err)
    })
});

module.exports = router;